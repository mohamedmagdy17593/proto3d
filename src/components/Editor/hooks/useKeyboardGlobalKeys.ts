import { useEffect } from 'react';
import { useEditorState } from 'actions/editor/state';
import {
  decreaseControlsSize,
  increaseControlsSize,
  setTransformMode,
} from 'actions/editor/controls';
import {
  cloneSelectedModel,
  deleteSelectedModel,
  setSelectedModel,
} from 'actions/editor/model';
import { isCmdOrCtrlPressed } from 'utils/helpers';
import { redo, undo } from 'actions/editor/history';

function useKeyboardGlobalKeys() {
  let { disableActions } = useEditorState();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (disableActions) {
        return;
      }

      // undo and redo key bindings
      let isCmdZ = isCmdOrCtrlPressed(e) && (e.key === 'z' || e.key === 'Z');
      if (isCmdZ && e.shiftKey) {
        e.preventDefault();
        (e.target as any)?.blur?.();
        redo();
      } else if (isCmdZ) {
        e.preventDefault();
        (e.target as any)?.blur?.();
        undo();
      }

      // if target element is input then don't execute any shortcuts bellow
      let targetNodeName = (e.target as Element).nodeName;
      if (['INPUT'].includes(targetNodeName)) {
        return;
      }

      if (isCmdOrCtrlPressed(e)) {
        switch (e.key) {
          case 'd':
          case 'D': {
            e.preventDefault();
            cloneSelectedModel();
            break;
          }
        }
      } else {
        switch (e.key) {
          case 'm':
          case 'M': {
            setTransformMode('translate');
            break;
          }
          case 's':
          case 'S': {
            setTransformMode('scale');
            break;
          }
          case 'r':
          case 'R': {
            setTransformMode('rotate');
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
          case 'Backspace':
          case 'Delete': {
            deleteSelectedModel();
            break;
          }
          case 'Escape': {
            setSelectedModel(null);
            break;
          }
        }
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [disableActions]);
}

export default useKeyboardGlobalKeys;
