import { nanoid } from 'nanoid';
import { editorState, ModelTypes } from './state';

export function addModel(type: ModelTypes) {
  editorState.models.push({
    id: nanoid(),
    type,
  });
}
