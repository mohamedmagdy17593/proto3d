import { pushToHistory } from './history';
import { editorState } from './state';

interface ActionContainerArg<F extends (...args: any[]) => any> {
  preform: F;
  commitToHistory?: boolean;
}
export function actionContainer<F extends (...args: any[]) => any>({
  preform,
  commitToHistory = false,
}: ActionContainerArg<F>) {
  return (...args: Parameters<F>) => {
    let preformResult = preform(...args);

    if (commitToHistory) {
      pushToHistory(editorState);
    }

    return preformResult;
  };
}
