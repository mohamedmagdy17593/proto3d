import { useEffect } from 'react';
import { editorState } from 'actions/editor/state';
import {
  decreaseControlsSize,
  increaseControlsSize,
} from 'actions/editor/controls';
import { deleteSelectedModel } from 'actions/editor/model';
import { isCmdOrCtrlPressed } from 'utils/helpers';
import { redo, undo } from 'actions/editor/history';

function useKeyboardGlobalKeys() {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // undo and redo key bindings
      if (isCmdOrCtrlPressed(e) && e.shiftKey && e.key === 'z') {
        e.preventDefault();
        (e.target as any)?.blur?.();
        redo();
      } else if (isCmdOrCtrlPressed(e) && e.key === 'z') {
        e.preventDefault();
        (e.target as any)?.blur?.();
        undo();
      }

      // if target element is input then don't execute any shortcuts bellow
      let targetNodeName = (e.target as Element).nodeName;
      if (['INPUT'].includes(targetNodeName)) {
        return;
      }

      switch (e.key) {
        case 'm': {
          editorState.transformMode = 'translate';
          break;
        }
        case 's': {
          editorState.transformMode = 'scale';
          break;
        }
        case 'r': {
          editorState.transformMode = 'rotate';
          break;
        }
        case '+':
        case '=': {
          increaseControlsSize();
          break;
        }
        case '-':
        case '_': {
          decreaseControlsSize();
          break;
        }
        case 'Backspace': {
          deleteSelectedModel();
          break;
        }
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);
}

export default useKeyboardGlobalKeys;
