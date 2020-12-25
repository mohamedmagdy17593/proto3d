import { useReducer } from 'react';
import tinycolor from 'tinycolor2';

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
