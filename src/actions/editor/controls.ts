import { editorState } from './state';
import { actionContainer } from './utils';
import { TransformMode } from 'types/editor';

export const increaseControlsSize = actionContainer({
  preform() {
    if (editorState.selectedModelId) {
      editorState.transformControlSize += 0.1;
    }
  },
});

export const decreaseControlsSize = actionContainer({
  preform() {
    if (editorState.selectedModelId) {
      editorState.transformControlSize = Math.max(
        editorState.transformControlSize - 0.1,
        0.5,
      );
    }
  },
});

export const setTransformMode = actionContainer({
  preform(mode: TransformMode) {
    editorState.transformMode = mode;
  },
});
