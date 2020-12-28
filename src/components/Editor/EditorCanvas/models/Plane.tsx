import { Plane as DreiPlane } from 'drei';
import { PlaneModel } from '../../../../types/editor';
import EditorTransformControls from '../EditorTransformControls';
import { useModelProps } from 'utils/editor';

interface PlaneProps {
  model: PlaneModel;
}

function Plane({ model }: PlaneProps) {
  let { meshProps, materialProps } = useModelProps(model);

  return (
    <EditorTransformControls model={model}>
      <DreiPlane args={[15, 15]} {...meshProps}>
        <meshStandardMaterial {...materialProps} />
      </DreiPlane>
    </EditorTransformControls>
  );
}

export default Plane;
