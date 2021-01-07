/** @jsxImportSource @emotion/react */

import { Form, InputNumber, Space } from 'antd';
import _ from 'lodash';
import { InputDefinition, Model } from '../../../../types/editor';
import { useKeyPress } from 'utils/useKeyPress';
import { degreeAnglesToRadians, radiansAnglesToDegree } from 'utils/editor';

const MIN = -360;
const MAX = 360;

const debouncedCb = _.debounce(fn => fn(), 400);

interface RotationFieldProps {
  inputDefinition: InputDefinition<'rotation'>;
  properties: Model;
  onChange(properties: Partial<Model>, withHistory?: boolean): void;
}
function RotationField({
  inputDefinition,
  properties,
  onChange,
}: RotationFieldProps) {
  let value = degreeAnglesToRadians(properties[inputDefinition.key]);
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

    let arr: [x: number, y: number, z: number] = [...value];
    arr[index] = num;

    onChange({ [inputDefinition.key]: radiansAnglesToDegree(arr) });
    debouncedCb(() => {
      onChange({ [inputDefinition.key]: radiansAnglesToDegree(arr) }, true);
    });
  }

  return (
    <Form.Item label={inputDefinition.label}>
      <Space>
        <InputNumber
          css={{ width: 80 }}
          placeholder="x°"
          value={x}
          onChange={number => handleChange({ index: 0, number })}
          step={step}
          min={MIN}
          max={MAX}
        />
        <InputNumber
          css={{ width: 80 }}
          placeholder="y°"
          value={y}
          onChange={number => handleChange({ index: 1, number })}
          step={step}
          min={MIN}
          max={MAX}
        />
        <InputNumber
          css={{ width: 80 }}
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
