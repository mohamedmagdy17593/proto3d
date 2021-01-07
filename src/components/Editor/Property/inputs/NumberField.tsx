/** @jsxImportSource @emotion/react */

import { InputNumber, Form } from 'antd';
import _ from 'lodash';
import { InputDefinition } from 'types/editor';

const MIN = 1;

const debouncedCb = _.debounce(fn => fn(), 400);

interface NumberFieldProps {
  inputDefinition: InputDefinition;
  properties: any;
  onChange(properties: any, withHistory?: boolean): void;
}
function NumberField({
  inputDefinition,
  properties,
  onChange,
}: NumberFieldProps) {
  let value = properties[inputDefinition.key];
  let placeholder = inputDefinition.placeholder ?? inputDefinition.label;

  return (
    <Form.Item label={inputDefinition.label}>
      <InputNumber
        css={{ width: 80 }}
        placeholder={placeholder}
        value={value}
        onChange={number => {
          onChange({ [inputDefinition.key]: number });
          debouncedCb(() => {
            onChange({ [inputDefinition.key]: number }, true);
          });
        }}
        min={MIN}
      />
    </Form.Item>
  );
}

export default NumberField;
