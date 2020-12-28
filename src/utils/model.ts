import { titleCase } from 'tiny-case';
import { Model, ModelTypes } from 'types/editor';

let nameCounts: { [key: string]: number } = {};
export function getModelName(type: string) {
  let count = (nameCounts[type] = (nameCounts[type] ?? 0) + 1);
  let name = `${titleCase(type)} ${count}`;
  return name;
}

interface CreateNewModelArg {
  id: string;
  type: ModelTypes;
}
export function createNewModel({ id, type }: CreateNewModelArg): Model {
  switch (type) {
    case 'plane': {
      return {
        id,
        type,
        name: getModelName(type),
        color: '#393e46',
        scale: [1, 1, 1],
        position: [0, 0, 0],
        rotation: [0, 0, 0],
      };
    }
    case 'box': {
      return {
        id,
        type,
        name: getModelName(type),
        color: '#b55400',
        scale: [1, 1, 1],
        position: [0, 0, 0],
        rotation: [0, 0, 0],
      };
    }
    default: {
      throw Error(`unknown model Type ${type}`);
    }
  }
}
