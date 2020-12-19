import { titleCase } from 'tiny-case';

let nameCounts: { [key: string]: number } = {};
export function getModelName(type: string) {
  let count = (nameCounts[type] = (nameCounts[type] ?? 0) + 1);
  let name = `${titleCase(type)} ${count}`;
  return name;
}
