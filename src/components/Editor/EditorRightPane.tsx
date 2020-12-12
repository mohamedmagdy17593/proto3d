/** @jsxImportSource @emotion/react */

import { Canvas } from 'react-three-fiber';
import { OrbitControls, Stars } from 'drei';

function EditorRightPane() {
  return (
    <div css={{ height: '100%', width: '100%', padding: 12 }}>
      <Canvas>
        <ambientLight />
        {/* <spotLight intensity={2} position={[10, 15, 10]} angle={0.3} /> */}
        <OrbitControls />
        <Stars />
        <mesh>
          <boxBufferGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color={'brown'} />
        </mesh>
      </Canvas>
    </div>
  );
}

export default EditorRightPane;
