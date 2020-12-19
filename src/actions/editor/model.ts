import { nanoid } from 'nanoid';
import { Model, ModelTypes } from '../../types/editor';
import { editorState, useEditorState } from './state';
import { getModelColor, getModelName } from 'utils/model';

export function useSelectedModel() {
  let { selectedModelId, models } = useEditorState();
  return models.find(model => model.id === selectedModelId);
}

export function addModel(type: ModelTypes) {
  let id = nanoid();
  editorState.models.push({
    id,
    type,
    name: getModelName(type),
    color: getModelColor(type),
    size: [10, 10],
    position: [0, 0, 0],
  });
  editorState.selectedModelId = id;
}

export function updateModelProperties(id: string, Properties: Partial<Model>) {
  let selectedModel = editorState.models.find(model => model.id === id);
  Object.assign(selectedModel, Properties);
}

export function deleteSelectedModel() {
  let models = editorState.models.filter(
    model => model.id !== editorState.selectedModelId,
  );
  Object.assign(editorState, { models, selectedModelId: null });
}
