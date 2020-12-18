import { proxy, useProxy } from 'valtio';

export interface CanvasSettings {
  showAxis: boolean;
  showStars: boolean;
}

export interface EditorState {
  canvasSettings: CanvasSettings;
}

export function initEditorState(): EditorState {
  return {
    canvasSettings: {
      showAxis: false,
      showStars: false,
    },
  };
}

/**
 * create react proxy
 */
export const editorState = proxy(initEditorState());

export function useEditorState(): EditorState {
  return useProxy(editorState);
}
