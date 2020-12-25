/** @jsxImportSource @emotion/react */

import 'rc-color-picker/assets/index.css';

import { Form, InputNumber, Space } from 'antd';
import { InputDefinition } from '../../../../types/editor';

interface PositionFieldProps {
  inputDefinition: InputDefinition;
  properties: any;
  onChange(properties: any): void;
}
function PositionField({
  inputDefinition,
  properties,
  onChange,
}: PositionFieldProps) {
  let value = properties[inputDefinition.key];
  let [x, y, z] = value;

  function handleChange({
    index,
    number,
  }: {
    index: number;
    number: string | number | undefined;
  }) {
    // @ts-ignore
    let num = parseInt(number);
    if (isNaN(num)) return;

    let arr = [...value];
    arr[index] = num;
    onChange({ ...properties, [inputDefinition.key]: arr });
  }

  return (
    <Form.Item label={inputDefinition.label}>
      <Space>
        <InputNumber
          css={{ width: 50 }}
          placeholder="x"
          value={x}
          onChange={number => handleChange({ index: 0, number })}
        />
        <InputNumber
          css={{ width: 50 }}
          placeholder="y"
          value={y}
          onChange={number => handleChange({ index: 1, number })}
        />
        <InputNumber
          css={{ width: 50 }}
          placeholder="z"
          value={z}
          onChange={number => handleChange({ index: 2, number })}
        />
      </Space>
    </Form.Item>
  );
}

export default PositionField;
