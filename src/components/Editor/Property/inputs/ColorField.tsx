/** @jsxImportSource @emotion/react */

import 'rc-color-picker/assets/index.css';

import { Form } from 'antd';
import React from 'react';
import ColorPicker from 'rc-color-picker';
import _ from 'lodash';
import { InputDefinition } from '../../../../types/editor';

const debouncedCb = _.debounce(fn => fn(), 300);

interface ColorFieldProps {
  inputDefinition: InputDefinition;
  properties: any;
  onChange(properties: any): void;
}
function ColorField({
  inputDefinition,
  properties,
  onChange,
}: ColorFieldProps) {
  let value = properties[inputDefinition.key];

  function handleChange(value: any) {
    debouncedCb(() => {
      onChange({ ...properties, [inputDefinition.key]: value.color });
    });
  }

  return (
    <Form.Item
      css={{
        '&.ant-form-item': {
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'row',
        },
        '.ant-form-item-label': { padding: 0 },
        '.ant-form-item-control': {
          maxWidth: 'auto',
          flexGrow: 0,
          display: 'grid',
          alignItems: 'center',
        },
      }}
      label={inputDefinition.label}
    >
      <ColorPicker
        css={{
          '&.rc-color-picker-panel': {
            background: 'var(--component-background)',
          },
          '.rc-color-picker-panel-inner': {
            border: '1px solid var(--border-color-split)',
            boxShadow: 'var(--box-shadow-base)',
          },
          '.rc-color-picker-panel-params-input': {
            input: {
              background: 'var(--component-background)',
              border: '1px solid var(--border-color-split)',
            },
          },
          '.rc-color-picker-panel-params-lable-number': {
            background: 'var(--component-background)',
            ':hover': {
              boxShadow: 'none',
              background: 'var(--border-color-split)',
            },
          },
        }}
        placement="bottomRight"
        enableAlpha={false}
        open
        color={value}
        onChange={handleChange}
      >
        <span
          css={{
            position: 'relative',
            top: 2,
            width: 40,
            boxShadow: 'none',
          }}
          className="rc-color-picker-trigger"
        />
      </ColorPicker>
    </Form.Item>
  );
}

export default ColorField;
