import { titleCase } from 'tiny-case';
import { Model, ModelTypes } from 'types/editor';

let nameCounts: { [key: string]: number } = {};
export function getModelName(label: string) {
  let count = (nameCounts[label] = (nameCounts[label] ?? 0) + 1);
  let name = `${titleCase(label)} ${count}`;
  return name;
}

interface CreateNewModelArg {
  id: string;
  type: ModelTypes;
  name?: string;
  modelUrl?: string;
}
export function createNewModel({
  id,
  type,
  name,
  modelUrl,
}: CreateNewModelArg): Model {
  let label = name ?? type;

  switch (type) {
    case 'plane': {
      return {
        id,
        type,
        name: getModelName(label),
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
        name: getModelName(label),
        color: '#b55400',
        scale: [1, 1, 1],
        position: [0, 0, 0],
        rotation: [0, 0, 0],
      };
    }
    case 'sphere': {
      return {
        id,
        type,
        name: getModelName(label),
        color: '#b55400',
        scale: [1, 1, 1],
        position: [0, 0, 0],
        rotation: [0, 0, 0],
        segments: [15, 15],
        radius: 1,
      };
    }
    case 'custom': {
      return {
        id,
        type,
        name: getModelName(label),
        color: '#b55400',
        scale: [1, 1, 1],
        position: [0, 0, 0],
        rotation: [0, 0, 0],
        modelUrl: modelUrl!,
      };
    }
    default: {
      throw Error(`unknown model Type ${type}`);
    }
  }
}
