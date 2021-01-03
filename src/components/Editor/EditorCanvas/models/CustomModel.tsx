import { useLoader, useResource } from 'react-three-fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { CustomModel as CustomModelType } from '../../../../types/editor';
import EditorTransformControls from '../EditorTransformControls';
import { useModelProps } from 'utils/editor';

interface CustomModelProps {
  model: CustomModelType;
}

function CustomModel({ model }: CustomModelProps) {
  let primitive = useResource<any>();

  let { meshProps } = useModelProps(model, {
    meshRef: primitive,
  });

  let gltf = useLoader(GLTFLoader, 'models/wooden_table/scene.gltf');

  // I don't know Why
  let object = gltf.scene.clone(true);

  return (
    <EditorTransformControls model={model}>
      <group {...meshProps} ref={primitive}>
        <primitive object={object} />
      </group>
    </EditorTransformControls>
  );
}

export default CustomModel;
