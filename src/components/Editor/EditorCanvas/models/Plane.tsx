import { Plane as DreiPlane } from 'drei';
import { useResource } from 'react-three-fiber';
import { PlaneModel } from '../../../../types/editor';
import { degreeAnglesToRadians } from 'utils/editor';
import { SelectEdge } from 'components/common/model-helpers';
import { useIsSelectedModel } from 'actions/editor/model';

interface PlaneProps {
  model: PlaneModel;
}

function Plane({ model }: PlaneProps) {
  let isSelected = useIsSelectedModel(model);

  let boxRef = useResource<any>();

  return (
    <>
      <DreiPlane
        ref={boxRef}
        args={model.size}
        position={model.position}
        rotation={degreeAnglesToRadians(model.rotation)}
      >
        <meshStandardMaterial attach="material" color={model.color} />
      </DreiPlane>

      {isSelected && <SelectEdge meshRef={boxRef} model={model} />}
    </>
  );
}

export default Plane;
