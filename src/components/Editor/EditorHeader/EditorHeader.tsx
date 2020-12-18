/** @jsxImportSource @emotion/react */

import Logo from '../../Logo';
import EditorHeaderControllers from './EditorHeaderControllers';

function EditorHeader() {
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
      <Logo />
    </div>
  );
}

export default EditorHeader;
