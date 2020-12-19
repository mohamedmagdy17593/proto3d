import React from 'react';
import { InputDefinition } from '../../../types/editor';
import { Form } from '../../common/Form';
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
    default: {
      return <>{inputDefinition.key} is not supported</>;
    }
  }
}

export default PropertyForm;
