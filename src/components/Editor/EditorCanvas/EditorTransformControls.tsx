import React, { useEffect, useRef } from 'react';
import { TransformControls } from 'drei';
import { Object3D } from 'three';
import * as THREE from 'three';
import { useThree } from 'react-three-fiber';
import { useEditorCanvas } from './EditorCanvas';
import {
  cloneSelectedModel,
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
  let { scene } = useThree();

  let isShiftPressed = useKeyPress('Shift');
  let isAltPressed = useKeyPress('Alt');
  let actionState = useRef<'rest' | 'dragging' | 'cloned'>('rest');
  let clonedObjectRef = useRef<any>(null);

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

    let mouseDownHandler = () => {
      actionState.current = 'dragging';
      clonedObjectRef.current = controls.object?.clone();

      if (isAltPressed) {
        scene.add(clonedObjectRef.current);
        actionState.current = 'cloned';
      }
    };

    const mouseUpHandler = () => {
      if (actionState.current === 'cloned') {
        switch (transformMode) {
          case 'translate': {
            cloneSelectedModel({
              position: getControls(controls, 'position'),
            });
            setControls(controls, 'position', model.position);
            break;
          }
          case 'scale': {
            cloneSelectedModel({
              scale: getControls(controls, 'scale'),
            });
            setControls(controls, 'scale', model.scale);
            break;
          }
          case 'rotate': {
            cloneSelectedModel({
              rotation: getControls(controls, 'rotation'),
            });
            setControls(controls, 'rotation', model.rotation);
            break;
          }
        }
        scene.remove(clonedObjectRef.current);
      } else {
        switch (transformMode) {
          case 'translate': {
            updateModelPropertiesWithHistory(model.id, {
              position: getControls(controls, 'position'),
            });
            break;
          }
          case 'scale': {
            updateModelPropertiesWithHistory(model.id, {
              scale: getControls(controls, 'scale'),
            });
            break;
          }
          case 'rotate': {
            updateModelPropertiesWithHistory(model.id, {
              rotation: getControls(controls, 'rotation'),
            });
            break;
          }
        }
      }
      actionState.current = 'rest';
    };

    controls.addEventListener?.('mouseUp', mouseUpHandler);
    controls.addEventListener?.('mouseDown', mouseDownHandler);
    return () => {
      controls.removeEventListener?.('mouseUp', mouseUpHandler);
      controls.removeEventListener?.('mouseDown', mouseDownHandler);
    };
  }, [
    isAltPressed,
    model.id,
    model.position,
    model.rotation,
    model.scale,
    scene,
    transformMode,
  ]);

  useEffect(() => {
    if (isAltPressed && actionState.current === 'dragging') {
      scene.add(clonedObjectRef.current);
      actionState.current = 'cloned';
    }
  }, [isAltPressed, scene]);

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
