/** @jsxImportSource @emotion/react */

import { Canvas } from 'react-three-fiber';
import { OrbitControls, Stars, Sphere } from 'drei';
import { useEditorState } from '../../../actions/editor/state';

function EditorCanvas() {
  let { canvasSettings } = useEditorState();

  return (
    <div css={{ width: '100%', height: '100%', overflow: 'hidden' }}>
      <Canvas shadowMap camera={{ fov: 80, position: [5, 5, 5] }}>
        <OrbitControls />
        <ambientLight />

        {canvasSettings.showAxis && <axesHelper args={[100]} />}

        {canvasSettings.showStars && <Stars />}

        <pointLight castShadow intensity={0.8} position={[-2, 7, 7]} />

        <Sphere args={[1.5, 50, 50]}>
          <meshStandardMaterial attach="material" color="#b55400" />
        </Sphere>
      </Canvas>
    </div>
  );
}

export default EditorCanvas;
