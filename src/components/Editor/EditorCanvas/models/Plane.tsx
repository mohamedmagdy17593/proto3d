import { Plane as DreiPlane } from 'drei';
import { useResource } from 'react-three-fiber';
import { PlaneModel } from '../../../../types/editor';
import EditorTransformControls from '../EditorTransformControls';
import { useModelProps } from 'utils/editor';

interface PlaneProps {
  model: PlaneModel;
}

function Plane({ model }: PlaneProps) {
  let plane = useResource();

  let { meshProps, materialProps } = useModelProps(model, { meshRef: plane });

  return (
    <EditorTransformControls model={model}>
      <DreiPlane args={[15, 15]} {...meshProps} ref={plane}>
        <meshStandardMaterial {...materialProps} />
      </DreiPlane>
    </EditorTransformControls>
  );
}

export default Plane;
