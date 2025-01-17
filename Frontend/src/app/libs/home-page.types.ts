import { IPicture } from "@/shared/config/types/global.types";

export interface HomeItem {
  id: number;
  title: string;
  description: string;
  url: string;
  picture: IPicture;
}

export interface HomeData {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  mainDescription: string;
  blocks: HomeItem[];
  mainPicture: IPicture;
}
