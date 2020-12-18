/** @jsxImportSource @emotion/react */

import { SettingOutlined } from '@ant-design/icons';
import { setEditorState } from '../../../actions/editor/control';
import { useEditorState } from '../../../actions/editor/state';
import { IconCircleButton } from '../../common/Buttons';
import { Form } from '../../common/Form';
import { Popover, Tooltip } from '../../common/Popover';
import Switch from '../Controls/Switch';

function CanvasSettingButton() {
  let { canvasSettings } = useEditorState();

  return (
    <Popover
      title="Canvas Settings"
      content={
        <div style={{ width: '200px' }}>
          <Form>
            <Switch
              label="Show axis"
              checked={canvasSettings.showAxis}
              onChange={value =>
                setEditorState('canvasSettings.showAxis', value)
              }
            />
            <Switch
              label="Show Starts"
              checked={canvasSettings.showStars}
              onChange={value =>
                setEditorState('canvasSettings.showStars', value)
              }
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
