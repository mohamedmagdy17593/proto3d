/** @jsxImportSource @emotion/react */
import { Form, Switch as AntdSwitch, Input as AntdInput } from 'antd';

interface SwitchProps {
  label: React.ReactNode;
  checked: boolean;
  onChange(checked: boolean): void;
}
export function Switch({ label, checked, onChange }: SwitchProps) {
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
        },
      }}
      label={label}
    >
      <AntdSwitch checked={checked} onChange={onChange} />
    </Form.Item>
  );
}

interface InputProps {
  label: React.ReactNode;
  value: string;
  onChange(value: string): void;
}
export function Input({ label, value, onChange }: InputProps) {
  return (
    <Form.Item label={label}>
      <AntdInput value={value} onChange={e => onChange(e.target.value)} />
    </Form.Item>
  );
}
