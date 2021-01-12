/** @jsxImportSource @emotion/react */

import { QuestionOutlined } from '@ant-design/icons';
import { Button, List, Modal, Typography } from 'antd';
import { useState } from 'react';
import styled from '@emotion/styled';
import { Tooltip } from 'components/common/Popover';
import { commandKeyText } from 'utils/helpers';
import { useDisableAction } from 'actions/editor/editor';

function HelpButton() {
  let [show, setShow] = useState(false);

  return (
    <>
      <Tooltip title="Help">
        <Button
          css={{ position: 'absolute', right: 24, bottom: 24 }}
          type="default"
          shape="circle"
          onClick={() => setShow(true)}
          icon={<QuestionOutlined />}
        />
      </Tooltip>

      <Modal
        centered
        destroyOnClose
        visible={show}
        footer={false}
        onCancel={() => setShow(false)}
        title={<>Help ?</>}
      >
        <HelpList />
      </Modal>
    </>
  );
}

const { Text } = Typography;

const ShortcutItem = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
});

function HelpList() {
  useDisableAction();

  return (
    <List
      size="small"
      itemLayout="horizontal"
      dataSource={[
        <ShortcutItem>
          <Text>Move</Text>
          <Text keyboard>M</Text>
        </ShortcutItem>,
        <ShortcutItem>
          <Text>Resize or Scale</Text>
          <Text keyboard>S</Text>
        </ShortcutItem>,
        <ShortcutItem>
          <Text>Rotate</Text>
          <Text keyboard>R</Text>
        </ShortcutItem>,
        <ShortcutItem>
          <Text>Delete selected model</Text>
          <Text>
            <Text keyboard>Backspace</Text> or <Text keyboard>Delete</Text>
          </Text>
        </ShortcutItem>,
        <ShortcutItem>
          <Text>
            Snap to grid while <Text underline>Moving</Text>
          </Text>
          <Text keyboard>Shift+Drag</Text>
        </ShortcutItem>,
        <ShortcutItem>
          <Text>
            Snap to grid while <Text underline>Scaling</Text>
          </Text>
          <Text keyboard>Shift+Drag</Text>
        </ShortcutItem>,
        <ShortcutItem>
          <Text>
            Rotate 15° while <Text underline>Rotating</Text>
          </Text>
          <Text keyboard>Shift+Drag</Text>
        </ShortcutItem>,
        <ShortcutItem>
          <Text>Adjust controls UI sizes</Text>
          <Text>
            <Text keyboard>+</Text> / <Text keyboard>-</Text>
          </Text>
        </ShortcutItem>,
        <ShortcutItem>
          <Text>Undo</Text>
          <Text keyboard>{commandKeyText}+Z</Text>
        </ShortcutItem>,
        <ShortcutItem>
          <Text>Redo</Text>
          <Text keyboard>{commandKeyText}+Shift+Z</Text>
        </ShortcutItem>,
      ]}
      renderItem={item => (
        <List.Item>
          <List.Item.Meta description={item} />
        </List.Item>
      )}
    />
  );
}

export default HelpButton;
