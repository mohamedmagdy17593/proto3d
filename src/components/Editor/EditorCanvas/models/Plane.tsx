import { Plane as DreiPlane } from 'drei';
import { PlaneModel } from '../../../../types/editor';

interface PlaneProps {
  model: PlaneModel;
}

function Plane({ model }: PlaneProps) {
  return (
    <DreiPlane args={model.size} position={model.position}>
      <meshStandardMaterial attach="material" color={model.color} />
    </DreiPlane>
  );
}

export default Plane;
