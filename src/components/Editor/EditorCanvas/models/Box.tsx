import { Box as DreiBox } from 'drei';
import { BoxModel } from '../../../../types/editor';
import { degreeAnglesToRadians } from 'utils/editor';

interface BoxProps {
  model: BoxModel;
}

function Box({ model }: BoxProps) {
  return (
    <DreiBox
      args={model.size}
      position={model.position}
      rotation={degreeAnglesToRadians(model.rotation)}
    >
      <meshStandardMaterial attach="material" color={model.color} />
    </DreiBox>
  );
}

export default Box;
