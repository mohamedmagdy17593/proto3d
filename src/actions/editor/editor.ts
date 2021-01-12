import { useEffect } from 'react';
import { editorState, initEditorState } from './state';
import { actionContainer } from './utils';

export const resetEditorState = actionContainer({
  preform() {
    Object.assign(editorState, initEditorState());
  },
  commitToHistory: true,
});

export function setDisableAction(disableAction: boolean) {
  editorState.disableActions = disableAction;
}

export function useDisableAction() {
  useEffect(() => {
    setDisableAction(true);
    return () => setDisableAction(false);
  }, []);
}
