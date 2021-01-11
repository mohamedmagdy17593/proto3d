/** @jsxImportSource @emotion/react */

import { Form, InputNumber, Space } from 'antd';
import _ from 'lodash';
import { InputDefinition } from '../../../../types/editor';

const MIN = 0;

const debouncedCb = _.debounce(fn => fn(), 400);

interface SegmentsProps {
  inputDefinition: InputDefinition;
  properties: any;
  onChange(properties: any, withHistory?: boolean): void;
}
function Segments({ inputDefinition, properties, onChange }: SegmentsProps) {
  let value = properties[inputDefinition.key];
  let [w, h] = value;

  function handleChange({
    index,
    number,
  }: {
    index: number;
    number: string | number | null | undefined;
  }) {
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
          placeholder="W"
          value={w}
          onChange={number => handleChange({ index: 0, number })}
          min={MIN}
        />
        <InputNumber
          css={{ width: 60 }}
          placeholder="H"
          value={h}
          onChange={number => handleChange({ index: 1, number })}
          min={MIN}
        />
      </Space>
    </Form.Item>
  );
}

export default Segments;
