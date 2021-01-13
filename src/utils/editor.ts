import { useEffect, useReducer } from 'react';
import tinycolor from 'tinycolor2';
import { OrbitControls, TransformControls } from 'drei';
import _ from 'lodash';
import * as THREE from 'three';
import { setSelectedModel, useIsSelectedModel } from 'actions/editor/model';
import { Model } from 'types/editor';
import { CameraPosition } from 'actions/editor/state';
import { setCameraPosition } from 'actions/editor/editor';

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
  reRenderGeometryDeps?: any;
}
export function useModelProps(
  model: Model,
  { meshRef, reRenderGeometryDeps }: UseModelPropsOptions,
) {
  let isSelected = useIsSelectedModel(model);

  let outlineColor =
    'color' in model ? (isLight(model.color) ? 'black' : 'white') : undefined;

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
          color: outlineColor,
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
  }, [
    meshRef,
    isSelected,
    outlineColor,
    reRenderGeometryDeps, // for external deps
  ]);

  let meshProps = {
    onClick(e: React.MouseEvent) {
      e.stopPropagation();
      setSelectedModel(model.id);
    },
  };

  let materialProps = {
    attach: 'material',
    color: 'color' in model ? model.color : undefined,
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
  controls.object![key].x = x;
  controls.object![key].y = y;
  controls.object![key].z = z;
}

export function isPointClose(point1: number[], point2: number[]) {
  return _.zip(point1, point2).every(
    ([num1, num2]) => Math.abs(num1! - num2!) < 0.05,
  );
}

const DRAG_MOUSE_THRESHOLD = 2;

interface UseCanvasPreventClickWhileDraggingArg {
  canvasContainerRef: React.RefObject<HTMLDivElement>;
}
export function useCanvasPreventClickWhileDragging({
  canvasContainerRef,
}: UseCanvasPreventClickWhileDraggingArg) {
  useEffect(() => {
    let canvas = canvasContainerRef.current?.querySelector('canvas');
    if (!canvas) {
      return;
    }

    let isDragging = false;
    let downMousePosition: { clientX: number; clientY: number };

    let preventClick = (event: Event) => {
      event.preventDefault();
      event.stopImmediatePropagation();
    };

    let mousedownHandler = (e: MouseEvent) => {
      let { clientX, clientY } = e;
      downMousePosition = { clientX, clientY };
      canvas?.addEventListener('mousemove', mousemoveHandler);
    };

    let mouseupHandler = () => {
      if (isDragging) {
        canvas?.addEventListener('click', preventClick);
      } else {
        canvas?.removeEventListener('click', preventClick);
      }
      isDragging = false;
      canvas?.removeEventListener('mousemove', mousemoveHandler);
    };

    let mousemoveHandler = (e: MouseEvent) => {
      let { clientX, clientY } = e;
      let { clientX: downClientX, clientY: downClientY } = downMousePosition;
      let movingDistance = Math.sqrt(
        (downClientX - clientX) ** 2 + (downClientY - clientY) ** 2,
      );
      if (movingDistance > DRAG_MOUSE_THRESHOLD) {
        isDragging = true;
      }
    };

    canvas.addEventListener('mousedown', mousedownHandler);
    canvas.addEventListener('mouseup', mouseupHandler);
    return () => {
      canvas?.removeEventListener('mousedown', mousedownHandler);
      canvas?.removeEventListener('mouseup', mouseupHandler);
      canvas?.removeEventListener('mousemove', mousemoveHandler);
    };
  }, [canvasContainerRef]);
}

const throttleCb = _.throttle(fn => fn(), 300);
export function saveCameraPositionToEditorState(orbit: OrbitControls) {
  throttleCb(() => {
    if (orbit.object?.position && orbit?.target) {
      let { x: px, y: py, z: pz } = orbit.object.position;

      let { x: tx, y: ty, z: tz } = orbit.target as THREE.Vector3;

      let cameraPosition: CameraPosition = {
        position: [px, py, pz],
        target: [tx, ty, tz],
      };

      setCameraPosition(cameraPosition);
    }
  });
}

export function setCameraPositionToOrbit(
  orbit: OrbitControls,
  cameraPosition: CameraPosition,
) {
  if (orbit?.object && cameraPosition) {
    let [px, py, pz] = cameraPosition.position;
    orbit.object.position.set(px, py, pz);

    let [tx, ty, tz] = cameraPosition.target;
    //@ts-ignore
    orbit.target.x = tx;
    //@ts-ignore
    orbit.target.y = ty;
    //@ts-ignore
    orbit.target.z = tz;
  }
}
