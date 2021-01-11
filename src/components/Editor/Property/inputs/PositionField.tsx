/** @jsxImportSource @emotion/react */

import 'rc-color-picker/assets/index.css';

import { Form, InputNumber, Space } from 'antd';
import _ from 'lodash';
import { InputDefinition } from '../../../../types/editor';

const debouncedCb = _.debounce(fn => fn(), 400);

interface PositionFieldProps {
  inputDefinition: InputDefinition;
  properties: any;
  onChange(properties: any, withHistory?: boolean): void;
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
    number: string | number | null | undefined;
  }) {
    console.log('run');
    // @ts-ignore
    let num = parseInt(number);
    if (isNaN(num)) return;

    let arr = [...value];
    arr[index] = num;

    onChange({ [inputDefinition.key]: arr });
    debouncedCb(() => {
      onChange({ [inputDefinition.key]: arr }, true);
    });
  }

  return (
    <Form.Item label={inputDefinition.label}>
      <Space>
        <InputNumber
          css={{ width: 60 }}
          placeholder="x"
          value={x}
          onChange={number => handleChange({ index: 0, number })}
        />
        <InputNumber
          css={{ width: 60 }}
          placeholder="y"
          value={y}
          onChange={number => handleChange({ index: 1, number })}
        />
        <InputNumber
          css={{ width: 60 }}
          placeholder="z"
          value={z}
          onChange={number => handleChange({ index: 2, number })}
        />
      </Space>
    </Form.Item>
  );
}

export default PositionField;
