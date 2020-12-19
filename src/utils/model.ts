import { titleCase } from 'tiny-case';

let nameCounts: { [key: string]: number } = {};
export function getModelName(type: string) {
  let count = (nameCounts[type] = (nameCounts[type] ?? 0) + 1);
  let name = `${titleCase(type)} ${count}`;
  return name;
}

export function getModelColor(type: string): string {
  switch (type) {
    case 'plane':
      return '#393e46';
    default:
      return '#b55400';
  }
}
