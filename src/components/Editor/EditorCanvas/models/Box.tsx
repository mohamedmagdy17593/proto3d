import { Box as DreiBox } from 'drei';
import { useResource } from 'react-three-fiber';
import { BoxModel } from '../../../../types/editor';
import { degreeAnglesToRadians } from 'utils/editor';
import { SelectEdge } from 'components/common/model-helpers';
import { useIsSelectedModel } from 'actions/editor/model';

interface BoxProps {
  model: BoxModel;
}

function Box({ model }: BoxProps) {
  let isSelected = useIsSelectedModel(model);

  let boxRef = useResource<any>();

  return (
    <>
      <DreiBox
        ref={boxRef}
        args={model.size}
        position={model.position}
        rotation={degreeAnglesToRadians(model.rotation)}
      >
        <meshStandardMaterial attach="material" color={model.color} />
      </DreiBox>

      {isSelected && <SelectEdge meshRef={boxRef} model={model} />}
    </>
  );
}

export default Box;
