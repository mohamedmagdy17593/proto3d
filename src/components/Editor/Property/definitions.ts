import { PropertiesDefinitions, InputDefinition } from '../../../types/editor';

const transformPropertiesDefinitions: InputDefinition[] = [
  {
    key: 'transform-divider',
    label: 'Transform',
    inputType: 'divider',
  },
  {
    key: 'position',
    label: 'Position',
    inputType: 'position',
  },
  {
    key: 'scale',
    label: 'Scale',
    inputType: 'scale-field',
  },
  {
    key: 'rotation',
    label: 'Rotation',
    inputType: 'rotation',
  },
];

const stylePropertiesDefinitions: InputDefinition[] = [
  {
    key: 'style-divider',
    label: 'Style',
    inputType: 'divider',
  },
  {
    key: 'color',
    label: 'Color',
    inputType: 'color-field',
  },
];

export const propertiesDefinitions: PropertiesDefinitions = {
  plane: [
    {
      key: 'name',
      label: 'Name',
      inputType: 'text-field',
    },
    ...transformPropertiesDefinitions,
    ...stylePropertiesDefinitions,
  ],
  box: [
    {
      key: 'name',
      label: 'Name',
      inputType: 'text-field',
    },
    ...transformPropertiesDefinitions,
    ...stylePropertiesDefinitions,
  ],
  sphere: [
    {
      key: 'name',
      label: 'Name',
      inputType: 'text-field',
    },
    {
      key: 'radius',
      label: 'radius',
      inputType: 'number-field',
    },
    {
      key: 'segments',
      label: 'segments',
      inputType: 'segments',
    },
    ...transformPropertiesDefinitions,
    ...stylePropertiesDefinitions,
  ],
  custom: [
    {
      key: 'name',
      label: 'Name',
      inputType: 'text-field',
    },
    ...transformPropertiesDefinitions,
    ...stylePropertiesDefinitions,
  ],
};
