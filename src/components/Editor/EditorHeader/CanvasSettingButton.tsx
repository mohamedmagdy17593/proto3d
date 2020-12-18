/** @jsxImportSource @emotion/react */

import { SettingOutlined } from '@ant-design/icons';
import { IconCircleButton } from '../../common/Buttons';
import { Form } from '../../common/Form';
import { Popover, Tooltip } from '../../common/Popover';
import Switch from '../Controls/Switch';

function CanvasSettingButton() {
  return (
    <Popover
      title="Canvas Settings"
      content={
        <div style={{ width: '200px' }}>
          <Form>
            <Switch
              label="Show axis"
              checked={true}
              onChange={value => console.log(value)}
            />
            <Switch
              label="Show Starts"
              checked={true}
              onChange={value => console.log(value)}
            />
          </Form>
        </div>
      }
    >
      <Tooltip title="Canvas Settings">
        <IconCircleButton>
          <SettingOutlined />
        </IconCircleButton>
      </Tooltip>
    </Popover>
  );
}

export default CanvasSettingButton;
