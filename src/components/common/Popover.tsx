import './Popover.less';
import { Popover as AntdPopover, Tooltip as AntdTooltip } from 'antd';
import { PopoverProps as AntdPopoverProps } from 'antd/lib/popover';
import { TooltipProps as AntdToolTipProps } from 'antd/lib/tooltip';

interface PopoverProps extends AntdPopoverProps {}
export function Popover(props: PopoverProps) {
  return (
    <AntdPopover
      overlayClassName="popover-overlay"
      placement="bottomLeft"
      trigger="click"
      {...props}
    />
  );
}

type ToolTipProps = AntdToolTipProps;
export function Tooltip(props: ToolTipProps) {
  return (
    <AntdTooltip
      mouseEnterDelay={0.5}
      overlayClassName="tooltip-overlay"
      placement="bottom"
      {...props}
    />
  );
}
