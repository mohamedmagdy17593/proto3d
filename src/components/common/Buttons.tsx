/** @jsxImportSource @emotion/react */

import { Button } from 'antd';
import { ButtonProps } from 'antd/lib/button';
import { Tooltip } from './Popover';

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

export const MODEL_BUTTON_SIZE = 52;

interface ModelButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  src: string;
  name: string;
}
export function ModelButton({ src, name, ...restProps }: ModelButtonProps) {
  return (
    <Tooltip title={name}>
      <button
        css={{
          background: 'transparent',
          padding: 0,
          border: 0,
          cursor: 'pointer',
          position: 'relative',
          overflow: 'hidden',
          '::before': {
            content: '"+"',
            fontSize: 24,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.5)',
            lineHeight: `${MODEL_BUTTON_SIZE}px`,
            transition: 'transform .2s',
            transform: `scale(0)`,
          },
          ':hover::before': {
            transform: 'none',
          },
        }}
        {...restProps}
      >
        <img
          css={{ objectFit: 'cover' }}
          width={MODEL_BUTTON_SIZE}
          height={MODEL_BUTTON_SIZE}
          alt={name}
          src={src}
        ></img>
      </button>
    </Tooltip>
  );
}
