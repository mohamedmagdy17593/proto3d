import { useEffect, useReducer } from 'react';
import tinycolor from 'tinycolor2';
import { TransformControls } from 'drei';
import _ from 'lodash';
import * as THREE from 'three';
import { setSelectedModel, useIsSelectedModel } from 'actions/editor/model';
import { Model } from 'types/editor';

export function degreeAnglesToRadians<T extends number[]>(angles: T): T {
  return angles.map(THREE.MathUtils.radToDeg) as T;
}

export function radiansAnglesToDegree<T extends number[]>(angles: T): T {
  return angles.map(THREE.MathUtils.degToRad) as T;
}

export function isLight(color: any) {
  return tinycolor(color).isLight();
}

export function useForceRender() {
  return useReducer(() => ({}), {})[1];
}

interface UseModelPropsOptions {
  meshRef: any;
}
export function useModelProps(model: Model, { meshRef }: UseModelPropsOptions) {
  let isSelected = useIsSelectedModel(model);

  // Select outline
  useEffect(() => {
    if (isSelected) {
      let group: THREE.Group, outlineMesh: THREE.Mesh;

      let timeout = setTimeout(() => {
        if (!meshRef.current) {
          return;
        }

        group = meshRef.current.parent;
        let geometry = meshRef.current.geometry;
        let outline = new THREE.MeshBasicMaterial({
          color: 'white',
          side: THREE.BackSide,
        });
        outlineMesh = new THREE.Mesh(geometry, outline);
        outlineMesh.scale.multiplyScalar(1.05);
        group.add(outlineMesh);
      });

      return () => {
        clearTimeout(timeout);
        group.remove(outlineMesh);
      };
    }
  }, [meshRef, isSelected]);

  let meshProps = {
    onClick(e: React.MouseEvent) {
      e.stopPropagation();
      setSelectedModel(model.id);
    },
  };

  let materialProps = {
    attach: 'material',
    color: model.color,
  };

  return {
    meshProps,
    materialProps,
  };
}

export function showControlHelperUi(
  controls: TransformControls,
  show: boolean,
) {
  if (show) {
    controls.showX = true;
    controls.showY = true;
    controls.showZ = true;
  } else {
    controls.showX = false;
    controls.showY = false;
    controls.showZ = false;
  }
}

export function getControls(
  controls: TransformControls,
  key: 'scale' | 'position' | 'rotation',
): [x: number, y: number, z: number] {
  let { x, y, z } = controls.object![key];
  return [x, y, z];
}

export function setControls(
  controls: TransformControls,
  key: 'scale' | 'position' | 'rotation',
  value: [x: number, y: number, z: number],
) {
  let [x, y, z] = value;
  console.log({ x, y, z });
  controls.object![key].x = x;
  controls.object![key].y = y;
  controls.object![key].z = z;
}

export function isPointClose(point1: number[], point2: number[]) {
  return _.zip(point1, point2).every(
    ([num1, num2]) => Math.abs(num1! - num2!) < 0.05,
  );
}
