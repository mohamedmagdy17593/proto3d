import { Box as DreiBox, TransformControls } from 'drei';
import { useResource } from 'react-three-fiber';
import { useEffect, useRef } from 'react';
import _ from 'lodash';
import { BoxModel } from '../../../../types/editor';
import {
  getControlsPosition,
  isPointClose,
  setControlsPosition,
  showControlHelperUi,
  useModelProps,
} from 'utils/editor';
import {
  useIsSelectedModel,
  updateModelProperties,
} from 'actions/editor/model';

interface BoxProps {
  model: BoxModel;
}

const debouncedCb = _.debounce(fn => fn(), 300);

function Box({ model }: BoxProps) {
  let isSelected = useIsSelectedModel(model);

  let boxRef = useResource<any>();
  let transformRef = useRef<any>();

  let { meshProps, materialProps } = useModelProps(model);

  useEffect(() => {
    let controls: TransformControls = transformRef.current;
    showControlHelperUi(controls, isSelected);
  }, [isSelected]);

  useEffect(() => {
    let controls: TransformControls = transformRef.current;
    controls.addEventListener?.('change', () => {
      debouncedCb(() => {
        updateModelProperties(model.id, {
          position: getControlsPosition(controls),
        });
      });
    });
  }, [model.id]);

  useEffect(() => {
    let controls: TransformControls = transformRef.current;
    if (!controls?.object) return;
    let isModelPositionChanged = !isPointClose(
      model.position,
      getControlsPosition(controls),
    );
    if (isModelPositionChanged) {
      setControlsPosition(controls, model.position);
    }
  }, [model.position]);

  return (
    <>
      <TransformControls ref={transformRef}>
        <DreiBox ref={boxRef} args={model.size} {...meshProps}>
          <meshStandardMaterial {...materialProps} />
        </DreiBox>
      </TransformControls>
    </>
  );
}

export default Box;
