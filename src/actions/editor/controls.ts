import { editorState } from './state';

export function increaseControlsSize() {
  editorState.transformControlSize += 0.1;
}

export function decreaseControlsSize() {
  editorState.transformControlSize = Math.max(
    editorState.transformControlSize - 0.1,
    0.5,
  );
}
