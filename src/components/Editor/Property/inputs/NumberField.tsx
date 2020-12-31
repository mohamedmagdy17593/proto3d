/** @jsxImportSource @emotion/react */

import { InputNumber, Form } from 'antd';
import { InputDefinition } from 'types/editor';

const MIN = 1;

interface NumberFieldProps {
  inputDefinition: InputDefinition;
  properties: any;
  onChange(properties: any): void;
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
        onChange={number =>
          onChange({ ...properties, [inputDefinition.key]: number })
        }
        min={MIN}
      />
    </Form.Item>
  );
}

export default NumberField;
