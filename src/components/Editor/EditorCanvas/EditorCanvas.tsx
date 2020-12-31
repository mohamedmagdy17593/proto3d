/** @jsxImportSource @emotion/react */

import { Canvas } from 'react-three-fiber';
import { OrbitControls, Stars } from 'drei';
import { createContext, useContext, useRef } from 'react';
import { useEditorState } from '../../../actions/editor/state';
import RenderModels from './RenderModels';
import { useCanvasPreventClickWhileDragging } from 'utils/editor';

interface EditorCanvasContextProps {
  orbitRef: React.RefObject<OrbitControls>;
}
const EditorCanvasContext = createContext({} as EditorCanvasContextProps);

export function useEditorCanvas() {
  return useContext(EditorCanvasContext);
}

function EditorCanvas() {
  let { canvasSettings } = useEditorState();

  let orbitRef = useRef<OrbitControls>(null);

  let canvasContainerRef = useRef<HTMLDivElement>(null);
  useCanvasPreventClickWhileDragging({ canvasContainerRef });

  let editorCanvasContextValue = {
    orbitRef,
  };

  return (
    <div
      ref={canvasContainerRef}
      css={{ width: '100%', height: '100%', overflow: 'hidden' }}
    >
      <Canvas
        shadowMap
        camera={{
          position: [10, 10, 4],
          up: [0, 0, 1], // rotate around z axis
        }}
      >
        <EditorCanvasContext.Provider value={editorCanvasContextValue}>
          <OrbitControls ref={orbitRef} />
          <ambientLight />

          {canvasSettings.showAxis && <axesHelper args={[100]} />}

          {canvasSettings.showStars && <Stars />}

          <pointLight castShadow intensity={0.8} position={[0, 0, 5]} />

          <RenderModels />
        </EditorCanvasContext.Provider>
      </Canvas>
    </div>
  );
}

export default EditorCanvas;
