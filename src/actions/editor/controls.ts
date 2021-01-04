import { editorState } from './state';

export function increaseControlsSize() {
  if (editorState.selectedModelId) {
    editorState.transformControlSize += 0.1;
  }
}

export function decreaseControlsSize() {
  if (editorState.selectedModelId) {
    editorState.transformControlSize = Math.max(
      editorState.transformControlSize - 0.1,
      0.5,
    );
  }
}
