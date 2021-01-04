/** @jsxImportSource @emotion/react */

import { Button, Space } from 'antd';
import { BiUndo, BiRedo } from 'react-icons/bi';
import { Tooltip } from 'components/common/Popover';
import { undo, redo, useHistoryManager } from 'actions/editor/history';
import { commandKeyText } from 'utils/helpers';

function EditorHistoryButtons() {
  let { canRedo, canUndo } = useHistoryManager();

  return (
    <Space size="small">
      <Tooltip title={`Undo (${commandKeyText}+Z)`}>
        <Button
          css={{ svg: { position: 'relative', top: 2 } }}
          size="small"
          type="link"
          disabled={!canUndo}
          onClick={() => undo()}
          icon={<BiUndo />}
        />
      </Tooltip>
      <Tooltip title={`Redo (${commandKeyText}+Shift+Z)`}>
        <Button
          css={{ svg: { position: 'relative', top: 2 } }}
          size="small"
          type="link"
          disabled={!canRedo}
          onClick={() => redo()}
          icon={<BiRedo />}
        />
      </Tooltip>
    </Space>
  );
}

export default EditorHistoryButtons;
