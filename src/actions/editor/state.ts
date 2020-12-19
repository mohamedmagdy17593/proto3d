import { proxy, useProxy } from 'valtio';
import { Model } from '../../types/editor';

export interface CanvasSettings {
  showAxis: boolean;
  showStars: boolean;
}

export interface EditorState {
  canvasSettings: CanvasSettings;
  models: Model[];
  selectedModelId: string | null;
}

export function initEditorState(): EditorState {
  return {
    canvasSettings: {
      showAxis: true,
      showStars: false,
    },
    models: [],
    selectedModelId: null,
  };
}

/**
 * create react proxy
 */
export const editorState = proxy(initEditorState());

export function useEditorState(): EditorState {
  return useProxy(editorState);
}
