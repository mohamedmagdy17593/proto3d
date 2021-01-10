import { proxy, snapshot, useProxy } from 'valtio';
import { editorState, EditorState } from './state';

interface HistoryEditorState {
  models: EditorState['models'];
  selectedModelId: EditorState['selectedModelId'];
}

// using class for testing valtio with classes
class HistoryManager {
  undoStack: HistoryEditorState[] = [];
  redoStack: HistoryEditorState[] = [];
  lastState: HistoryEditorState;

  constructor(historyEditorState: HistoryEditorState) {
    this.lastState = historyEditorState;
  }

  get canUndo() {
    return this.undoStack.length > 0;
  }

  get canRedo() {
    return this.redoStack.length > 0;
  }
}

export const historyManager = proxy(
  new HistoryManager(getCleanHistoryState(editorState)),
);

export function useHistoryManager() {
  return useProxy(historyManager);
}

export function pushToHistory(editorState: EditorState) {
  let historyEditorState = getCleanHistoryState(editorState);
  // add last state to undo stack
  historyManager.undoStack.push(historyManager.lastState);
  // clear redo stack if there is any state on it
  historyManager.redoStack.length = 0;
  // assign new editor State to lastState
  historyManager.lastState = historyEditorState;
}

export function getCleanHistoryState(
  editorState: EditorState,
): HistoryEditorState {
  let { models, selectedModelId } = snapshot(editorState);
  return { models, selectedModelId };
}

export function undo() {
  if (!historyManager.canUndo) {
    return;
  }

  historyManager.redoStack.push(historyManager.lastState);
  historyManager.lastState = historyManager.undoStack.pop()!;
  Object.assign(editorState, historyManager.lastState);
}

export function redo() {
  if (!historyManager.canRedo) {
    return;
  }

  historyManager.undoStack.push(historyManager.lastState);
  historyManager.lastState = historyManager.redoStack.pop()!;
  Object.assign(editorState, historyManager.lastState);
}
