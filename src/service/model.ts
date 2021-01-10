import axios from 'axios';
import { ApiModel } from 'types/model';

const API_URL = process.env.REACT_APP_API_URL!;

interface SearchModelsArg {
  search?: string;
  cursor?: number;
}
export async function searchModels({ search, cursor }: SearchModelsArg) {
  let { data } = await axios.get<{ result: ApiModel[] }>(`${API_URL}/models`, {
    params: { search, cursor },
  });

  return data.result;
}

export async function getModel(id: string) {
  let { data } = await axios.get<{ model: ApiModel }>(`${API_URL}/model/${id}`);

  return data.model;
}

export async function upload(model: ApiModel) {
  await axios.post<{ model: ApiModel }>(`${API_URL}/upload-model`, model);
}
