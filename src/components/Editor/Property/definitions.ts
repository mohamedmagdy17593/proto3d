import { PropertiesDefinitions } from '../../../types/editor';

export const propertiesDefinitions: PropertiesDefinitions = {
  plane: [
    {
      key: 'name',
      label: 'Name',
      inputType: 'text-field',
    },
    {
      key: 'color',
      label: 'Color',
      inputType: 'color-field',
    },
    {
      key: 'size',
      label: 'Size',
      inputType: '2d-size-field',
    },
    {
      key: 'position',
      label: 'Position',
      inputType: 'position',
    },
    {
      key: 'rotation',
      label: 'Rotation',
      inputType: 'rotation',
    },
  ],
  box: [
    {
      key: 'name',
      label: 'Name',
      inputType: 'text-field',
    },
    {
      key: 'color',
      label: 'Color',
      inputType: 'color-field',
    },
    {
      key: 'size',
      label: 'Size',
      inputType: '3d-size-field',
    },
    {
      key: 'position',
      label: 'Position',
      inputType: 'position',
    },
    {
      key: 'rotation',
      label: 'Rotation',
      inputType: 'rotation',
    },
  ],
};
