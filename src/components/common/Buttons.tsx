/** @jsxImportSource @emotion/react */

import { Button } from 'antd';
import { ButtonProps } from 'antd/lib/button';

interface IconCircleButtonProps extends ButtonProps {}
export function IconCircleButton({
  children,
  ...props
}: React.PropsWithChildren<IconCircleButtonProps>) {
  return (
    <Button
      css={{ '.anticon': { position: 'relative', top: 1 } }}
      type="dashed"
      shape="circle"
      size="small"
      icon={children}
      {...props}
    />
  );
}
