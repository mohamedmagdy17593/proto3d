/** @jsxImportSource @emotion/react */

import styled from '@emotion/styled';
import SplitPane from 'react-split-pane';
import PropertyPanel from './Property/PropertyPanel';
import EditorLeftPane from './EditorLeftPane';
import EditorRightPane from './EditorRightPane';
import useKeyboardGlobalKeys from './hooks/useKeyboardGlobalKeys';
import HelpButton from './HelpButton';
import { SCROLL_BAR_WIDTH } from 'utils/helpers';

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
      <SplitPane
        css={{ '.Pane': { height: '100%', overflow: 'auto' } }}
        split="vertical"
        minSize={148 + SCROLL_BAR_WIDTH}
        maxSize={508 + SCROLL_BAR_WIDTH}
        defaultSize={208 + SCROLL_BAR_WIDTH}
      >
        <EditorLeftPane />
        <EditorRightPane />
      </SplitPane>
      <HelpButton />
    </EditorWrapper>
  );
}

export default Editor;
