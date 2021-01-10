export type ApiModelStatus =
  | 'not-uploaded'
  | 'uploading'
  | 'uploaded'
  | 'error-while-uploading';

export interface ApiModel {
  id: string;
  imgSmall: string;
  imgLarge: string;
  name: string;
  sketchfabUrl: string;
  status: ApiModelStatus;
  statusMessage: String;
  gltfUrl?: string;
}
