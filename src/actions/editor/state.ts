import { proxy, useProxy } from 'valtio';

export interface CanvasSettings {
  showAxis: boolean;
  showStars: boolean;
}

export type ModelTypes = 'plane';

export interface ModelBase {
  id: string;
  type: ModelTypes;
}

export interface PlaneModel extends ModelBase {
  type: 'plane';
}

export type Model = PlaneModel;

export interface EditorState {
  canvasSettings: CanvasSettings;
  models: Model[];
}

export function initEditorState(): EditorState {
  return {
    canvasSettings: {
      showAxis: true,
      showStars: false,
    },
    models: [],
  };
}

/**
 * create react proxy
 */
export const editorState = proxy(initEditorState());

export function useEditorState(): EditorState {
  return useProxy(editorState);
}
