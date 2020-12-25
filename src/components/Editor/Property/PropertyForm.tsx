import { InputDefinition } from '../../../types/editor';
import { Form } from '../../common/Form';
import ColorField from './inputs/ColorField';
import PositionField from './inputs/PositionField';
import RotationField from './inputs/RotationField';
import SizeField from './inputs/SizeField';
import TextField from './inputs/TextField';

interface PropertyFormProps {
  inputDefinitions: InputDefinition[];
  properties: any;
  onChange(properties: any): void;
}
function PropertyForm({
  properties,
  onChange,
  inputDefinitions,
}: PropertyFormProps) {
  return (
    <Form>
      {inputDefinitions.map(inputDefinition => {
        return (
          <PropertyInput
            key={inputDefinition.key}
            inputDefinition={inputDefinition}
            properties={properties}
            onChange={onChange}
          />
        );
      })}
    </Form>
  );
}

interface PropertyInputProps {
  inputDefinition: InputDefinition;
  properties: any;
  onChange(properties: any): void;
}
function PropertyInput({
  inputDefinition,
  properties,
  onChange,
}: PropertyInputProps) {
  switch (inputDefinition.inputType) {
    case 'text-field': {
      return (
        <TextField
          inputDefinition={inputDefinition}
          properties={properties}
          onChange={onChange}
        />
      );
    }
    case 'color-field': {
      return (
        <ColorField
          inputDefinition={inputDefinition}
          properties={properties}
          onChange={onChange}
        />
      );
    }
    case '2d-size-field': {
      return (
        <SizeField
          inputDefinition={inputDefinition}
          properties={properties}
          onChange={onChange}
        />
      );
    }
    case 'position': {
      return (
        <PositionField
          inputDefinition={inputDefinition}
          properties={properties}
          onChange={onChange}
        />
      );
    }
    case 'rotation': {
      return (
        <RotationField
          inputDefinition={inputDefinition}
          properties={properties}
          onChange={onChange}
        />
      );
    }
    default: {
      return <>{inputDefinition.key} is not supported</>;
    }
  }
}

export default PropertyForm;
