/** @jsxImportSource @emotion/react */

import { /* Button, */ Form, InputNumber, Space } from 'antd';
// import { useState } from 'react';
// import { DisconnectOutlined, LinkOutlined } from '@ant-design/icons';
import _ from 'lodash';
import { InputDefinition } from '../../../../types/editor';
// import { Tooltip } from 'components/common/Popover';

const MIN = 0;

const debouncedCb = _.debounce(fn => fn(), 400);

interface ScaleFieldProps {
  inputDefinition: InputDefinition;
  properties: any;
  onChange(properties: any, withHistory?: boolean): void;
}
function ScaleField({
  inputDefinition,
  properties,
  onChange,
}: ScaleFieldProps) {
  let value = properties[inputDefinition.key];
  let [x, y, z] = value;

  // let [isLinked, setIsLinked] = useState(true);

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
    // if (isLinked) {
    //   arr = arr.map((val, i) => (index === i ? num : (num * val) / arr[index]));
    // } else {
    arr[index] = num;
    // }
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
          min={MIN}
        />
        <InputNumber
          css={{ width: 60 }}
          placeholder="y"
          value={y}
          onChange={number => handleChange({ index: 1, number })}
          min={MIN}
        />
        <InputNumber
          css={{ width: 60 }}
          placeholder="z"
          value={z}
          onChange={number => handleChange({ index: 2, number })}
          min={MIN}
        />
        {/* <Tooltip title={isLinked ? 'Linked' : 'UnLinked'}>
          <Button
            onClick={() => setIsLinked(f => !f)}
            icon={isLinked ? <LinkOutlined /> : <DisconnectOutlined />}
          />
        </Tooltip> */}
      </Space>
    </Form.Item>
  );
}

export default ScaleField;
