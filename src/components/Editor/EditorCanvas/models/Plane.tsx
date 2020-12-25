import { Plane as DreiPlane } from 'drei';
import { PlaneModel } from '../../../../types/editor';
import { degreeAnglesToRadians } from 'utils/editor';

interface PlaneProps {
  model: PlaneModel;
}

function Plane({ model }: PlaneProps) {
  return (
    <DreiPlane
      args={model.size}
      position={model.position}
      rotation={degreeAnglesToRadians(model.rotation)}
    >
      <meshStandardMaterial attach="material" color={model.color} />
    </DreiPlane>
  );
}

export default Plane;
