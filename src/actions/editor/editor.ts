import { editorState, initEditorState } from './state';
import { actionContainer } from './utils';

export const resetEditorState = actionContainer({
  preform() {
    Object.assign(editorState, initEditorState());
  },
  commitToHistory: true,
});
