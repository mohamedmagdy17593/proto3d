export function degreeAnglesToRadians<T extends number[]>(angles: T): T {
  return angles.map(degreeAngleToRadian) as T;
}

export function degreeAngleToRadian(angle: number) {
  return (angle / 180) * Math.PI;
}
