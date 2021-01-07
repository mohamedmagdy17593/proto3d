import { editorState, initEditorState } from './state';

export function resetEditorState() {
  Object.assign(editorState, initEditorState());
}
