import React from 'react';
import _ from 'lodash';
import { InputDefinition } from '../../../../types/editor';
import { Input } from '../../../common/controls';

const debouncedCb = _.debounce(fn => fn(), 400);

interface TextFieldProps {
  inputDefinition: InputDefinition;
  properties: any;
  onChange(properties: any, withHistory?: boolean): void;
}
function TextField({ inputDefinition, properties, onChange }: TextFieldProps) {
  let value = properties[inputDefinition.key];

  function handleChange(value: string) {
    onChange({ [inputDefinition.key]: value });
    debouncedCb(() => {
      onChange({ [inputDefinition.key]: value }, true);
    });
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
