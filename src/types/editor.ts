export type ModelTypes = 'plane' | 'box';

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

export type Model = PlaneModel | BoxModel;

export type InputType =
  | 'divider' // 🤓
  | 'text-field'
  | 'color-field'
  | 'scale-field'
  | 'position'
  | 'rotation';

export type TransformMode = 'translate' | 'rotate' | 'scale';

export interface InputDefinition {
  inputType: InputType;
  key: string;
  label: string;
}

export type PropertiesDefinitions = {
  [key in ModelTypes]: InputDefinition[];
};
