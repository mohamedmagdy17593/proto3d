import { useReducer } from 'react';
import tinycolor from 'tinycolor2';
import { setSelectedModel } from 'actions/editor/model';
import { Model } from 'types/editor';

export function degreeAnglesToRadians<T extends number[]>(angles: T): T {
  return angles.map(degreeAngleToRadian) as T;
}

export function degreeAngleToRadian(angle: number) {
  return (angle / 180) * Math.PI;
}

export function isLight(color: any) {
  return tinycolor(color).isLight();
}

export function useForceRender() {
  return useReducer(() => ({}), {})[1];
}

export function useModelProps(model: Model) {
  let meshProps = {
    position: model.position,
    rotation: degreeAnglesToRadians(model.rotation),
    onClick() {
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
