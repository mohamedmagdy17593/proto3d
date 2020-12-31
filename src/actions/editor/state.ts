import { proxy, useProxy } from 'valtio';
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
export const editorState = proxy(initEditorState());

export function useEditorState(): EditorState {
  return useProxy(editorState);
}
