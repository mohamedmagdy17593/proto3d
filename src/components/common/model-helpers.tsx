import { useLayoutEffect, useReducer } from 'react';
import { useIsSelectedModel } from 'actions/editor/model';
import { Model } from 'types/editor';
import { degreeAnglesToRadians, isLight, useForceRender } from 'utils/editor';

interface SelectEdgeProps {
  meshRef: any;
  model: Model;
}
export function SelectEdge({ meshRef, model }: SelectEdgeProps) {
  let forceRender = useForceRender();
  let geometry = meshRef.current?.geometry;

  useLayoutEffect(() => forceRender(), [forceRender, model]);

  if (geometry) {
    let lineColor = isLight(model.color) ? 'black' : 'white';
    return (
      <lineSegments
        position={model.position}
        rotation={degreeAnglesToRadians(model.rotation)}
      >
        <edgesGeometry attach="geometry" args={[meshRef.current?.geometry]} />
        <lineBasicMaterial color={lineColor} attach="material" />
      </lineSegments>
    );
  }
  return null;
}
