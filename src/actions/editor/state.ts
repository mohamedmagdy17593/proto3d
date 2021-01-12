import { proxy, snapshot, subscribe, useProxy } from 'valtio';
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
  disableActions: boolean;
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
    disableActions: false,
  };
}

/**
 * create react proxy
 */
let localStorageEditorState = window.localStorage.getItem('editor-state');
export const editorState = proxy<EditorState>(
  localStorageEditorState
    ? { ...initEditorState(), ...JSON.parse(localStorageEditorState) }
    : initEditorState(),
);

subscribe(editorState, () => {
  // extract clean localhost canvas state
  let { canvasSettings, models } = snapshot(editorState);
  let editorStateString = JSON.stringify({ canvasSettings, models });
  window.localStorage.setItem('editor-state', editorStateString);
});

export function useEditorState(): EditorState {
  return useProxy(editorState);
}
