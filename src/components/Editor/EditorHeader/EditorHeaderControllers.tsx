import { Divider, Space } from 'antd';
import CanvasSettingButton from './CanvasSettingButton';
import EditorToolbox from './EditorToolbox';

function EditorHeaderControllers() {
  return (
    <Space>
      <CanvasSettingButton />

      <Divider type="vertical" />

      <EditorToolbox />
    </Space>
  );
}

export default EditorHeaderControllers;
