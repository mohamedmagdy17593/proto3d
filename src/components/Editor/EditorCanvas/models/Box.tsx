import { Box as DreiBox } from 'drei';
import { useResource } from 'react-three-fiber';
import { BoxModel } from '../../../../types/editor';
import { useModelProps } from 'utils/editor';
import { SelectEdge } from 'components/common/model-helpers';
import { useIsSelectedModel } from 'actions/editor/model';

interface BoxProps {
  model: BoxModel;
}

function Box({ model }: BoxProps) {
  let isSelected = useIsSelectedModel(model);

  let boxRef = useResource<any>();

  let { meshProps, materialProps } = useModelProps(model);

  return (
    <>
      <DreiBox ref={boxRef} args={model.size} {...meshProps}>
        <meshStandardMaterial {...materialProps} />
      </DreiBox>

      {isSelected && <SelectEdge meshRef={boxRef} model={model} />}
    </>
  );
}

export default Box;
