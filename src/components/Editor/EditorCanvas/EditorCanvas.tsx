/** @jsxImportSource @emotion/react */

import { Canvas } from 'react-three-fiber';
import { OrbitControls } from 'drei';

function EditorCanvas() {
  return (
    <div css={{ width: '100%', height: '100%', overflow: 'hidden' }}>
      <Canvas shadowMap camera={{ fov: 80, position: [5, 5, 5] }}>
        <OrbitControls />
        <axesHelper args={[100]} />
      </Canvas>
    </div>
  );
}

export default EditorCanvas;
