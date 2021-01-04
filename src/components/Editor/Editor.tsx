/** @jsxImportSource @emotion/react */

import styled from '@emotion/styled';
import SplitPane from 'react-split-pane';
import PropertyPanel from './Property/PropertyPanel';
import EditorLeftPane from './EditorLeftPane';
import EditorRightPane from './EditorRightPane';
import useKeyboardGlobalKeys from './hooks/useKeyboardGlobalKeys';
import HelpButton from './HelpButton';

const EditorWrapper = styled('div')({
  position: 'relative',
  width: '100%',
  height: '100%',
  overflow: 'hidden',
  '.Pane2': { overflow: 'hidden' },
  '*': {
    userSelect: 'none',
  },
});

function Editor() {
  useKeyboardGlobalKeys();

  return (
    <EditorWrapper>
      <PropertyPanel />
      <SplitPane split="vertical" minSize={148} maxSize={508} defaultSize={208}>
        <EditorLeftPane />
        <EditorRightPane />
      </SplitPane>
      <HelpButton />
    </EditorWrapper>
  );
}

export default Editor;
