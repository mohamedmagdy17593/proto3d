import { Space } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import { IconCircleButton } from '../../common/Buttons';
import { Popover, Tooltip } from '../../common/Popover';

function EditorHeaderControllers() {
  return (
    <Space>
      <Popover
        title="Canvas Settings"
        content={
          <div style={{ width: '200px' }}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Libero
            cupiditate autem et sunt velit minus aut necessitatibus,
            reprehenderit ad totam neque incidunt magnam reiciendis facilis modi
            iste, nemo beatae excepturi.{' '}
          </div>
        }
      >
        <Tooltip title="Canvas Settings">
          <IconCircleButton>
            <SettingOutlined />
          </IconCircleButton>
        </Tooltip>
      </Popover>
    </Space>
  );
}

export default EditorHeaderControllers;
