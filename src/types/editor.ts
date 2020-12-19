export type ModelTypes = 'plane';

export interface ModelBase {
  id: string;
  name: string;
  type: ModelTypes;
}

export interface PlaneModel extends ModelBase {
  type: 'plane';
}

export type Model = PlaneModel;

export type InputType = 'text-field';

export interface InputDefinition {
  inputType: InputType;
  key: string;
  label: string;
}

export type PropertiesDefinitions = {
  [key in ModelTypes]: InputDefinition[];
};
