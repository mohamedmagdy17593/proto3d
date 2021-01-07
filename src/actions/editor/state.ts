import { proxy, subscribe, useProxy } from 'valtio';
import { Model, TransformMode } from '../../types/editor';

export interface CanvasSettings {
  showAxis: boolean;
  showStars: boolean;
}

export interface EditorState {
  canvasSettings: CanvasSettings;
  models: Model[];
  selectedModelId: string | null;
  transformMode: TransformMode;
  transformControlSize: number;
}

export function initEditorState(): EditorState {
  return {
    canvasSettings: {
      showAxis: true,
      showStars: false,
    },
    models: [],
    selectedModelId: null,
    transformMode: 'translate',
    transformControlSize: 1,
  };
}

/**
 * create react proxy
 */
let localStorageEditorState = window.localStorage.getItem('editor-state');
export const editorState: EditorState = proxy(
  localStorageEditorState
    ? JSON.parse(localStorageEditorState)
    : initEditorState(),
);

export function useEditorState(): EditorState {
  return useProxy(editorState);
}

subscribe(editorState, () => {
  let editorStateString = JSON.stringify(editorState);
  window.localStorage.setItem('editor-state', editorStateString);
});
