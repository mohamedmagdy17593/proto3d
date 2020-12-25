/** @jsxImportSource @emotion/react */

import 'rc-color-picker/assets/index.css';

import { Button, Form, InputNumber, Space } from 'antd';
import { useState } from 'react';
import { DisconnectOutlined, LinkOutlined } from '@ant-design/icons';
import { InputDefinition } from '../../../../types/editor';
import { Tooltip } from 'components/common/Popover';
import { useKeyPress } from 'utils/useKeyPress';

const MIN = -360;
const MAX = 360;

interface RotationFieldProps {
  inputDefinition: InputDefinition;
  properties: any;
  onChange(properties: any): void;
}
function RotationField({
  inputDefinition,
  properties,
  onChange,
}: RotationFieldProps) {
  let value = properties[inputDefinition.key];
  let [x, y, z] = value;

  let [isLinked, setIsLinked] = useState(false);

  let isShiftPressed = useKeyPress('Shift');
  let step = isShiftPressed ? 9 : 1;

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
          placeholder="x°"
          value={x}
          onChange={number => handleChange({ index: 0, number })}
          step={step}
          min={MIN}
          max={MAX}
        />
        <InputNumber
          css={{ width: 50 }}
          placeholder="y°"
          value={y}
          onChange={number => handleChange({ index: 1, number })}
          min={MIN}
          max={MAX}
        />
        <InputNumber
          css={{ width: 50 }}
          placeholder="z°"
          value={z}
          onChange={number => handleChange({ index: 2, number })}
          min={MIN}
          max={MAX}
        />
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

export default RotationField;
