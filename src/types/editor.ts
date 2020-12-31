export type ModelTypes = 'plane' | 'box' | 'sphere';

export interface ModelBase {
  id: string;
  name: string;
  color: string;
  position: [x: number, y: number, z: number];
  scale: [x: number, y: number, z: number];
  rotation: [x: number, y: number, z: number];
  type: ModelTypes;
}

export interface PlaneModel extends ModelBase {
  type: 'plane';
}

export interface BoxModel extends ModelBase {
  type: 'box';
}

export interface SphereModel extends ModelBase {
  type: 'sphere';
  segments: [w: number, h: number];
  radius: number;
}

export type Model = PlaneModel | BoxModel | SphereModel;

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
