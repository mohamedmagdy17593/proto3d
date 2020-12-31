import { Sphere as DreiSphere } from 'drei';
import { useResource } from 'react-three-fiber';
import { useMemo } from 'react';
import { SphereModel } from '../../../../types/editor';
import EditorTransformControls from '../EditorTransformControls';
import { useModelProps } from 'utils/editor';

interface SphereProps {
  model: SphereModel;
}

function Sphere({ model }: SphereProps) {
  let plane = useResource();

  let { meshProps, materialProps } = useModelProps(model, {
    meshRef: plane,
    reRenderGeometryDeps: useMemo(() => [model.radius, model.segments], [
      model.radius,
      model.segments,
    ]),
  });

  return (
    <EditorTransformControls model={model}>
      <DreiSphere
        {...meshProps}
        args={[model.radius, ...model.segments]}
        ref={plane}
      >
        <meshStandardMaterial {...materialProps} />
      </DreiSphere>
    </EditorTransformControls>
  );
}

export default Sphere;
