/** @jsxImportSource @emotion/react */

import styled from '@emotion/styled';
import SplitPane from 'react-split-pane';
import EditorLeftPane from './EditorLeftPane';
import EditorRightPane from './EditorRightPane';

const EditorWrapper = styled('div')({
  width: '100%',
  height: '100%',
  '.Pane2': { overflow: 'hidden' },
});

function Editor() {
  return (
    <EditorWrapper>
      <SplitPane split="vertical" minSize={50} defaultSize={100}>
        <EditorLeftPane />
        <EditorRightPane />
      </SplitPane>
    </EditorWrapper>
  );
}

export default Editor;