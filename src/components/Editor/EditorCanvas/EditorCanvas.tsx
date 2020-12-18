/** @jsxImportSource @emotion/react */

import { Canvas } from 'react-three-fiber';
import { OrbitControls, Stars } from 'drei';
import { useEditorState } from '../../../actions/editor/state';

function EditorCanvas() {
  let { canvasSettings } = useEditorState();

  return (
    <div css={{ width: '100%', height: '100%', overflow: 'hidden' }}>
      <Canvas shadowMap camera={{ fov: 80, position: [5, 5, 5] }}>
        <OrbitControls />

        {canvasSettings.showAxis && <axesHelper args={[100]} />}

        {canvasSettings.showStars && <Stars />}
      </Canvas>
    </div>
  );
}

export default EditorCanvas;
