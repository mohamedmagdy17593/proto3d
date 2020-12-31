import { Sphere as DreiSphere } from 'drei';
import { SphereModel } from '../../../../types/editor';
import EditorTransformControls from '../EditorTransformControls';
import { useModelProps } from 'utils/editor';

interface SphereProps {
  model: SphereModel;
}

function Sphere({ model }: SphereProps) {
  let { meshProps, materialProps } = useModelProps(model);

  return (
    <EditorTransformControls model={model}>
      <DreiSphere {...meshProps} args={[model.radius, ...model.segments]}>
        <meshStandardMaterial {...materialProps} />
      </DreiSphere>
    </EditorTransformControls>
  );
}

export default Sphere;
