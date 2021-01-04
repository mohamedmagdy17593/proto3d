import { DownloadOutlined } from '@ant-design/icons';
import { Button, Space } from 'antd';
import { download3dCanvas } from '../EditorCanvas/EditorCanvas';
import EditorHistoryButtons from './EditorHistoryButtons';
import Logo from 'components/Logo';

function EditorHeaderControllersRightSide() {
  function handleDownload() {
    download3dCanvas();
  }

  return (
    <Space>
      <EditorHistoryButtons />

      <Button
        onClick={handleDownload}
        type="primary"
        shape="round"
        size="small"
      >
        <DownloadOutlined /> Download
      </Button>
      <Logo />
    </Space>
  );
}

export default EditorHeaderControllersRightSide;
