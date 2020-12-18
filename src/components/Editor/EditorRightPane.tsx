/** @jsxImportSource @emotion/react */

import EditorHeader from './EditorHeader/EditorHeader';
import EditorCanvas from './EditorCanvas/EditorCanvas';

function EditorRightPane() {
  return (
    <div
      css={{
        height: '100%',
        width: '100%',
        display: 'grid',
        gridTemplateRows: '40px 1fr',
      }}
    >
      <EditorHeader />
      <EditorCanvas />
    </div>
  );
}

export default EditorRightPane;
