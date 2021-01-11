/** @jsxImportSource @emotion/react */

import styled from '@emotion/styled';
import SplitPane from 'react-split-pane';
import { proxy, useProxy } from 'valtio';
import _ from 'lodash';
import PropertyPanel from './Property/PropertyPanel';
import EditorLeftPane from './EditorLeftPane';
import EditorRightPane from './EditorRightPane';
import useKeyboardGlobalKeys from './hooks/useKeyboardGlobalKeys';
import HelpButton from './HelpButton';
import { SCROLL_BAR_WIDTH } from 'utils/helpers';

export const editorUiState = proxy({ splitPaneSize: 208 + SCROLL_BAR_WIDTH });

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

const debouncedCb = _.debounce(fn => fn(), 400);

function Editor() {
  useKeyboardGlobalKeys();

  let { splitPaneSize } = useProxy(editorUiState);

  return (
    <EditorWrapper>
      <PropertyPanel />
      <SplitPane
        css={{ '.Pane': { height: '100%', overflow: 'auto' } }}
        split="vertical"
        minSize={148 + SCROLL_BAR_WIDTH}
        maxSize={508 + SCROLL_BAR_WIDTH}
        size={splitPaneSize}
        onChange={size => {
          debouncedCb(() => {
            editorUiState.splitPaneSize = size;
          });
        }}
      >
        <EditorLeftPane />
        <EditorRightPane />
      </SplitPane>
      <HelpButton />
    </EditorWrapper>
  );
}

export default Editor;
