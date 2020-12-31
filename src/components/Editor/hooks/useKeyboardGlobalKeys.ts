import { useEffect } from 'react';
import { editorState } from 'actions/editor/state';
import {
  decreaseControlsSize,
  increaseControlsSize,
} from 'actions/editor/controls';

function useKeyboardGlobalKeys() {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
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
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);
}

export default useKeyboardGlobalKeys;
