/** @jsxImportSource @emotion/react */

import { Form as AntdForm } from 'antd';
import { FormProps as AntdFormProps } from 'antd/lib/form';

type FormProps = AntdFormProps;
export function Form(props: FormProps) {
  return (
    <AntdForm
      css={{
        '.ant-row.ant-form-item': {
          marginBottom: 12,
        },
        '.ant-row.ant-form-item:last-child': {
          marginBottom: 0,
        },
      }}
      layout="vertical"
      size="small"
      {...props}
    ></AntdForm>
  );
}
