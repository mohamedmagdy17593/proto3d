export type ModelTypes = 'plane' | 'box' | 'sphere' | 'custom';

export interface ModelBase {
  id: string;
  name: string;
  position: [x: number, y: number, z: number];
  scale: [x: number, y: number, z: number];
  rotation: [x: number, y: number, z: number];
  type: ModelTypes;
}

export interface ModelBaseWithStyles extends ModelBase {
  color: string;
}

export interface PlaneModel extends ModelBaseWithStyles {
  type: 'plane';
}

export interface BoxModel extends ModelBaseWithStyles {
  type: 'box';
}

export interface SphereModel extends ModelBaseWithStyles {
  type: 'sphere';
  segments: [w: number, h: number];
  radius: number;
}

export interface CustomModel extends ModelBase {
  type: 'custom';
  modelUrl: string;
}

export type Model = PlaneModel | BoxModel | SphereModel | CustomModel;

export type InputType =
  | 'divider' // 🤓
  | 'text-field'
  | 'number-field'
  | 'color-field'
  | 'scale-field'
  | 'position'
  | 'rotation'
  | 'segments';

export type TransformMode = 'translate' | 'rotate' | 'scale';

export interface InputDefinition<T extends string = string> {
  inputType: InputType;
  key: T;
  label: string;
  placeholder?: string;
}

export type PropertiesDefinitions = {
  [key in ModelTypes]: InputDefinition[];
};
