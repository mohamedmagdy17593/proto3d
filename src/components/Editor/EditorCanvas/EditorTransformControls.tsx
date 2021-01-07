import React, { useEffect, useRef } from 'react';
import { TransformControls } from 'drei';
import _ from 'lodash';
import { Object3D } from 'three';
import * as THREE from 'three';
import { useEditorCanvas } from './EditorCanvas';
import {
  updateModelPropertiesWithHistory,
  useIsSelectedModel,
} from 'actions/editor/model';
import { useEditorState } from 'actions/editor/state';
import { Model } from 'types/editor';
import {
  getControls,
  isPointClose,
  setControls,
  showControlHelperUi,
} from 'utils/editor';
import { useKeyPress } from 'utils/useKeyPress';

// FIXME: we should create new debounced function with every instance of EditorTransformControls component
// For now we will leave this like that 🤓
const debouncedMoveCb = _.debounce(fn => fn(), 400);
const debouncedScaleCb = _.debounce(fn => fn(), 400);
const debouncedRotateCb = _.debounce(fn => fn(), 400);

interface EditorTransformControlsProps {
  children: React.ReactElement<Object3D>;
  model: Model;
}

function EditorTransformControls({
  children,
  model,
}: EditorTransformControlsProps) {
  let isSelected = useIsSelectedModel(model);
  let { orbitRef } = useEditorCanvas();
  let { transformMode, transformControlSize } = useEditorState();
  let isShiftPressed = useKeyPress('Shift');

  let transformRef = useRef<any>();

  useEffect(() => {
    let controls: TransformControls = transformRef.current;
    controls.setMode?.(transformMode);
  }, [transformMode]);

  useEffect(() => {
    let controls: TransformControls = transformRef.current;
    controls.setSize?.(transformControlSize);
  }, [transformControlSize]);

  useEffect(() => {
    let controls: TransformControls = transformRef.current;
    if (isShiftPressed) {
      controls.setTranslationSnap?.(0.5);
      controls.setRotationSnap?.(THREE.MathUtils.degToRad(15));
      controls.setScaleSnap?.(0.25);
    } else {
      controls.setTranslationSnap?.(null);
      controls.setRotationSnap?.(null);
      controls.setScaleSnap?.(null);
    }
  }, [isShiftPressed]);

  // when dragging the object disable orbit control
  useEffect(() => {
    let controls: TransformControls = transformRef.current;
    const callback = (event: any) => {
      if (orbitRef.current) {
        orbitRef.current.enabled = !event.value;
      }
    };
    controls.addEventListener?.('dragging-changed', callback);
    return () => controls.removeEventListener?.('dragging-changed', callback);
  }, [orbitRef]);

  useEffect(() => {
    let controls: TransformControls = transformRef.current;
    showControlHelperUi(controls, isSelected);
  }, [isSelected]);

  useEffect(() => {
    let controls: TransformControls = transformRef.current;
    const callback = () => {
      switch (transformMode) {
        case 'translate': {
          debouncedMoveCb(() => {
            updateModelPropertiesWithHistory(model.id, {
              position: getControls(controls, 'position'),
            });
          });
          break;
        }
        case 'scale': {
          debouncedScaleCb(() => {
            updateModelPropertiesWithHistory(model.id, {
              scale: getControls(controls, 'scale'),
            });
          });
          break;
        }
        case 'rotate': {
          debouncedRotateCb(() => {
            updateModelPropertiesWithHistory(model.id, {
              rotation: getControls(controls, 'rotation'),
            });
          });
          break;
        }
      }
    };
    controls.addEventListener?.('objectChange', callback);
    return () => controls.removeEventListener?.('objectChange', callback);
  }, [model.id, transformMode]);

  let controls: TransformControls = transformRef.current;

  useEffect(() => {
    if (!controls?.object) return;
    let isModelPositionChanged = !isPointClose(
      model.position,
      getControls(controls, 'position'),
    );
    if (isModelPositionChanged) {
      setControls(controls, 'position', model.position);
    }
  }, [controls, model.position]);

  useEffect(() => {
    if (!controls?.object) return;
    let isModelScaleChanged = !isPointClose(
      model.scale,
      getControls(controls, 'scale'),
    );
    if (isModelScaleChanged) {
      setControls(controls, 'scale', model.scale);
    }
  }, [controls, model.scale]);

  useEffect(() => {
    if (!controls?.object) return;
    let isModelRotationChanged = !isPointClose(
      model.rotation,
      getControls(controls, 'rotation'),
    );
    if (isModelRotationChanged) {
      setControls(controls, 'rotation', model.rotation);
    }
  }, [controls, model.rotation]);

  return <TransformControls ref={transformRef}>{children}</TransformControls>;
}

export default EditorTransformControls;
