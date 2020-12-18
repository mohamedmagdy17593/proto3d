import _ from 'lodash';
import { editorState } from './state';

export function setEditorState(path: string, value: any) {
  _.set(editorState, path, value);
}
