/** @jsxImportSource @emotion/react */
import { Form, Switch as AntdSwitch } from 'antd';

interface SwitchProps {
  label: React.ReactNode;
  checked: boolean;
  onChange(checked: boolean): void;
}

function Switch({ label, checked, onChange }: SwitchProps) {
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

export default Switch;
