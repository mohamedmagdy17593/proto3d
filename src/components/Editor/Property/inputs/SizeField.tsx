/** @jsxImportSource @emotion/react */

import 'rc-color-picker/assets/index.css';

import { Button, Form, InputNumber, Space } from 'antd';
import React, { useState } from 'react';
import { DisconnectOutlined, LinkOutlined } from '@ant-design/icons';
import { InputDefinition } from '../../../../types/editor';
import { Tooltip } from 'components/common/Popover';

interface SizeFieldProps {
  inputDefinition: InputDefinition;
  properties: any;
  onChange(properties: any): void;
  type?: '2d' | '3d';
}
function SizeField({
  type = '2d',
  inputDefinition,
  properties,
  onChange,
}: SizeFieldProps) {
  let value = properties[inputDefinition.key];
  let [w, h, d] = value;

  let [isLinked, setIsLinked] = useState(true);

  function handleChange({
    index,
    number,
  }: {
    index: number;
    number: string | number | undefined;
  }) {
    // @ts-ignore
    let num = parseInt(number);
    if (!isNaN(num)) {
      let arr = [...value];
      if (isLinked) {
        arr = arr.map((val, i) =>
          Math.round(
            index === i ? num : arr[index] === 0 ? 0 : (num * val) / arr[index],
          ),
        );
      } else {
        arr[index] = num;
      }
      onChange({ ...properties, [inputDefinition.key]: arr });
    }
  }

  return (
    <Form.Item label={inputDefinition.label}>
      <Space>
        <InputNumber
          css={{ width: 50 }}
          placeholder="W"
          value={w}
          onChange={number => handleChange({ index: 0, number })}
        />
        <InputNumber
          css={{ width: 50 }}
          placeholder="H"
          value={h}
          onChange={number => handleChange({ index: 1, number })}
        />
        {type === '3d' && (
          <InputNumber
            css={{ width: 50 }}
            placeholder="D"
            value={d}
            onChange={number => handleChange({ index: 2, number })}
          />
        )}
        <Tooltip title={isLinked ? 'Linked' : 'UnLinked'}>
          <Button
            onClick={() => setIsLinked(f => !f)}
            icon={isLinked ? <LinkOutlined /> : <DisconnectOutlined />}
          />
        </Tooltip>
      </Space>
    </Form.Item>
  );
}

export default SizeField;
