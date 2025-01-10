import { IPicture } from "@/shared/config/types/global.types";

export interface IBlock {
  id: number;
  title: string;
  description: string;
  url: string;
  picture: IPicture;
}

export interface IApiDataResponse {
  data: IData;
  meta: object;
}

export interface IData {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  mainDescription: string;
  blocks: IBlock[];
  mainPicture: IPicture;
}
