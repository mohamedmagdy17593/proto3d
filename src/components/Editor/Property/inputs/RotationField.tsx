/** @jsxImportSource @emotion/react */

import { Form, InputNumber, Space } from 'antd';
import { InputDefinition } from '../../../../types/editor';
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
          step={step}
          min={MIN}
          max={MAX}
        />
        <InputNumber
          css={{ width: 50 }}
          placeholder="z°"
          value={z}
          onChange={number => handleChange({ index: 2, number })}
          step={step}
          min={MIN}
          max={MAX}
        />
      </Space>
    </Form.Item>
  );
}

export default RotationField;
