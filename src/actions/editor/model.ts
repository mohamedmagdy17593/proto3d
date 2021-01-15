import { nanoid } from 'nanoid';
import _ from 'lodash';
import { Model, ModelTypes } from '../../types/editor';
import { editorState, useEditorState } from './state';
import { actionContainer } from './utils';
import { historyManager } from './history';
import { createNewModel } from 'utils/model';

export function useSelectedModel() {
  let { selectedModelId, models } = useEditorState();
  return models.find(model => model.id === selectedModelId);
}

export function useIsSelectedModel(model: Model) {
  let { selectedModelId } = useEditorState();
  return selectedModelId === model.id;
}

interface AddModelArgs {
  modelUrl?: string;
  name?: string;
}
export const addModel = actionContainer({
  preform(type: ModelTypes, { modelUrl, name }: AddModelArgs = {}) {
    console.log('model');
    let id = nanoid();
    let model = createNewModel({ id, type, modelUrl, name });
    let models = [...editorState.models, model];
    Object.assign(editorState, { models, selectedModelId: id });
  },
  commitToHistory: true,
});

export function updateModelProperties(id: string, properties: Partial<Model>) {
  let selectedModel = editorState.models.find(model => model.id === id);
  Object.assign(selectedModel, properties);
}
export const updateModelPropertiesWithHistory = actionContainer({
  preform: updateModelProperties,
  commitToHistory: true,
});

export const deleteSelectedModel = actionContainer({
  preform() {
    let models = editorState.models.filter(
      model => model.id !== editorState.selectedModelId,
    );
    Object.assign(editorState, { models, selectedModelId: null });
  },
  commitToHistory: true,
});

export const cloneSelectedModel = actionContainer({
  preform(newProperties?: Partial<Model>) {
    let selectedModel = editorState.models.find(
      model => model.id === editorState.selectedModelId,
    );
    if (selectedModel) {
      let newSelectedMode = _.cloneDeep(selectedModel);
      newSelectedMode.id = nanoid();

      let [x, y, z] = newSelectedMode.position;
      Object.assign(
        newSelectedMode,
        newProperties || { position: [x + 1, y + 1, z] },
      );

      let models = [...editorState.models, newSelectedMode];
      Object.assign(editorState, {
        models,
        selectedModelId: newSelectedMode.id,
      });
    }
  },
  commitToHistory: true,
});

export const setSelectedModel = actionContainer({
  preform(id: string | null) {
    editorState.selectedModelId = id;
  },
});

// needs improvements
export function revertAddingBrokenModel(id: string) {
  // revalidate history stack
  while (historyManager.lastState.models.find(model => model.id === id)) {
    let lastState = historyManager.undoStack.pop();
    if (lastState) {
      historyManager.lastState = lastState;
    }
  }
  // reset editorState
  editorState.models = editorState.models.filter(model => model.id !== id);
}
