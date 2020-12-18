/* eslint-disable */
/** @jsxImportSource @emotion/react */

import { Canvas, useResource } from 'react-three-fiber';
import { OrbitControls, Stars, Sky } from 'drei';
import { useState } from 'react';

function Example() {
  const ref = useResource<any>();

  return (
    <div css={{ height: '100%', width: '100%', padding: 12 }}>
      <Canvas shadowMap camera={{ fov: 80, position: [5, 5, 5] }}>
        <axesHelper args={[100]} />

        {/* Utils */}
        <OrbitControls />
        {/* <Stars /> */}

        {/* environment */}
        <ambientLight />
        {/* <spotLight castShadow intensity={0.3} position={[-2, 7, 7]} ref={ref} />
        {ref.current && <spotLightHelper args={[ref.current, 1]} />} */}

        {/* shapes */}
        <Cube position={[0, 2, 0]} />
        <Sphere position={[2, 0, 0]} />
        <Cube position={[0, 0, 2]} />

        <Plane />
      </Canvas>
    </div>
  );
}

function Plane() {
  return (
    <mesh receiveShadow position={[0, -1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeBufferGeometry attach="geometry" args={[10, 10]} />
      <meshPhongMaterial attach="material" color="yellow" />
    </mesh>
  );
}

interface CubeProps {
  position: any;
}

function Cube({ position }: CubeProps) {
  let [isBig, setIsBig] = useState(false);

  return (
    <mesh
      castShadow
      // @ts-ignore

      position={position}
      onClick={() => setIsBig(f => !f)}
    >
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <meshPhysicalMaterial attach="material" color="red" />
    </mesh>
  );
}

function Sphere({ position }: CubeProps) {
  let [isBig, setIsBig] = useState(false);

  return (
    <mesh
      castShadow
      // @ts-ignore

      position={position}
      onClick={() => setIsBig(f => !f)}
    >
      <sphereBufferGeometry attach="geometry" args={[0.5, 50, 50]} />
      <meshPhongMaterial attach="material" color="red" />
    </mesh>
  );
}

export default Example;
