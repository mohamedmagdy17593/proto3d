import { Box as DreiBox, TransformControls } from 'drei';
import { useEffect, useRef } from 'react';
import _ from 'lodash';
import { BoxModel } from '../../../../types/editor';
import { useEditorCanvas } from '../EditorCanvas';
import {
  getControls,
  isPointClose,
  setControls,
  showControlHelperUi,
  useModelProps,
} from 'utils/editor';
import {
  useIsSelectedModel,
  updateModelProperties,
} from 'actions/editor/model';
import { useEditorState } from 'actions/editor/state';

interface BoxProps {
  model: BoxModel;
}

const debouncedCb = _.debounce(fn => fn(), 300);

function Box({ model }: BoxProps) {
  let isSelected = useIsSelectedModel(model);
  let { orbitRef } = useEditorCanvas();
  let transformRef = useRef<any>();

  let { meshProps, materialProps } = useModelProps(model);

  let { transformMode } = useEditorState();

  useEffect(() => {
    let controls: TransformControls = transformRef.current;
    controls.setMode?.(transformMode);
  }, [transformMode]);

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
          debouncedCb(() => {
            updateModelProperties(model.id, {
              position: getControls(controls, 'position'),
            });
          });
          break;
        }
        case 'scale': {
          debouncedCb(() => {
            updateModelProperties(model.id, {
              scale: getControls(controls, 'scale'),
            });
          });
          break;
        }
        case 'rotate': {
          debouncedCb(() => {
            updateModelProperties(model.id, {
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

  useEffect(() => {
    let controls: TransformControls = transformRef.current;
    if (!controls?.object) return;
    let isModelPositionChanged = !isPointClose(
      model.position,
      getControls(controls, 'position'),
    );
    if (isModelPositionChanged) {
      setControls(controls, 'position', model.position);
    }
  }, [model.position]);

  useEffect(() => {
    let controls: TransformControls = transformRef.current;
    if (!controls?.object) return;
    let isModelScaleChanged = !isPointClose(
      model.scale,
      getControls(controls, 'scale'),
    );
    if (isModelScaleChanged) {
      setControls(controls, 'scale', model.scale);
    }
  }, [model.scale]);

  useEffect(() => {
    let controls: TransformControls = transformRef.current;
    if (!controls?.object) return;
    let isModelRotationChanged = !isPointClose(
      model.rotation,
      getControls(controls, 'rotation'),
    );
    if (isModelRotationChanged) {
      setControls(controls, 'rotation', model.rotation);
    }
  }, [model.rotation]);

  return (
    <>
      <TransformControls ref={transformRef}>
        <DreiBox {...meshProps}>
          <meshStandardMaterial {...materialProps} />
        </DreiBox>
      </TransformControls>
    </>
  );
}

export default Box;
