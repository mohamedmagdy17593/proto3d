/** @jsxImportSource @emotion/react */

import EditorHeaderControllers from './EditorHeaderControllers';
import EditorHeaderControllersRightSide from './EditorHeaderControllersRightSide';
import { useHistoryManager } from 'actions/editor/history';

function EditorHeader() {
  let { undoStack, redoStack, lastState } = useHistoryManager();

  console.log({
    undoStack,
    redoStack,
    lastState,
  });

  return (
    <div
      css={{
        padding: '0 12px',
        borderBottom: '1px solid var(--border-color-split)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <EditorHeaderControllers />
      <EditorHeaderControllersRightSide />
    </div>
  );
}

export default EditorHeader;
