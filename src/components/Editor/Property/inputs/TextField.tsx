import React from 'react';
import { InputDefinition } from '../../../../types/editor';
import { Input } from '../../../common/controls';

interface TextFieldProps {
  inputDefinition: InputDefinition;
  properties: any;
  onChange(properties: any): void;
}
function TextField({ inputDefinition, properties, onChange }: TextFieldProps) {
  let value = properties[inputDefinition.key];

  function handleChange(value: string) {
    onChange({ ...properties, [inputDefinition.key]: value });
  }

  return (
    <Input
      label={inputDefinition.label}
      value={value}
      onChange={handleChange}
    />
  );
}

export default TextField;
