export type ModelTypes = 'plane' | 'box';

export interface ModelBase {
  id: string;
  name: string;
  color: string;
  position: [x: number, y: number, z: number];
  rotation: [x: number, y: number, z: number];
  type: ModelTypes;
}

export interface PlaneModel extends ModelBase {
  type: 'plane';
  size: [w: number, h: number];
}

export interface BoxModel extends ModelBase {
  type: 'box';
  size: [w: number, h: number, d: number];
}

export type Model = PlaneModel | BoxModel;

export type InputType =
  | 'text-field'
  | 'color-field'
  | '2d-size-field'
  | '3d-size-field'
  | 'position'
  | 'rotation';

export interface InputDefinition {
  inputType: InputType;
  key: string;
  label: string;
}

export type PropertiesDefinitions = {
  [key in ModelTypes]: InputDefinition[];
};
