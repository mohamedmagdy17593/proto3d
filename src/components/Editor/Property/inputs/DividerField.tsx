/** @jsxImportSource @emotion/react */

import { Divider } from 'antd';
import { InputDefinition } from '../../../../types/editor';

interface DividerFieldProps {
  inputDefinition: InputDefinition;
  properties: any;
  onChange(properties: any): void;
}
function DividerField({
  inputDefinition,
  properties,
  onChange,
}: DividerFieldProps) {
  return (
    <Divider
      css={{
        '&.ant-divider-horizontal.ant-divider-with-text': {
          margin: `12px 0`,
          color: 'var(--dim-text-color)',
        },
        '&.ant-divider-horizontal.ant-divider-with-text-left::before': {
          width: 0,
        },
        '.ant-divider-inner-text': { paddingLeft: 0 },
      }}
      orientation="left"
      plain
    >
      {inputDefinition.label}
    </Divider>
  );
}

export default DividerField;
