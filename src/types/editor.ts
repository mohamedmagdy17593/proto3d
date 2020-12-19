export type ModelTypes = 'plane';

export interface ModelBase {
  id: string;
  name: string;
  color: string;
  type: ModelTypes;
}

export interface PlaneModel extends ModelBase {
  type: 'plane';
  size: [number /* width */, number /* height */];
}

export type Model = PlaneModel;

export type InputType =
  | 'text-field'
  | 'color-field'
  | '2d-size-field'
  | '3d-size-field';

export interface InputDefinition {
  inputType: InputType;
  key: string;
  label: string;
}

export type PropertiesDefinitions = {
  [key in ModelTypes]: InputDefinition[];
};
