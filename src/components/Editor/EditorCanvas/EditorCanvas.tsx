/** @jsxImportSource @emotion/react */

import { Canvas } from 'react-three-fiber';
import { OrbitControls, Stars } from 'drei';
import { createContext, Suspense, useContext, useRef } from 'react';
import * as THREE from 'three';
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

// function for download
export let download3dCanvas: () => void;

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
        onCreated={({ gl, scene, camera }) => {
          // reassign
          download3dCanvas = () => {
            gl.render(scene, camera);
            gl.outputEncoding = THREE.sRGBEncoding;
            // @ts-ignore
            gl.preserveDrawingBuffer = true;
            gl.domElement.toBlob(
              function (blob) {
                var a = document.createElement('a');
                var url = URL.createObjectURL(blob);
                a.href = url;
                a.download = 'proto3d.png';
                a.click();
                console.log('function is actually being used');
              },
              'image/png',
              1.0,
            );
          };
        }}
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

          <Suspense fallback={null}>
            <RenderModels />
          </Suspense>
        </EditorCanvasContext.Provider>
      </Canvas>
    </div>
  );
}

export default EditorCanvas;
