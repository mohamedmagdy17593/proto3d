import { ClearOutlined, DownloadOutlined } from '@ant-design/icons';
import { Space, Dropdown, Menu, Modal } from 'antd';
import { download3dCanvas } from '../EditorCanvas/EditorCanvas';
import EditorHistoryButtons from './EditorHistoryButtons';
import Logo from 'components/Logo';
import { resetEditorState } from 'actions/editor/editor';

function EditorHeaderControllersRightSide() {
  function handleDownload() {
    download3dCanvas();
  }

  function handleClearCanvas() {
    Modal.confirm({
      title: 'Are you sure you want to clear the Canvas?',
      content: '',
      centered: true,
      onOk() {
        resetEditorState();
      },
    });
  }

  return (
    <Space>
      <EditorHistoryButtons />

      <Dropdown.Button
        onClick={handleDownload}
        type="primary"
        size="small"
        overlay={
          <Menu>
            <Menu.Item
              key="1"
              icon={<ClearOutlined />}
              onClick={handleClearCanvas}
            >
              Clear
            </Menu.Item>
          </Menu>
        }
      >
        <DownloadOutlined /> Download
      </Dropdown.Button>
      <Logo />
    </Space>
  );
}

export default EditorHeaderControllersRightSide;
