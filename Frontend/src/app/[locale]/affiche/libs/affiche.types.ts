import { IPicture } from "@/shared/config/types/global.types";

export interface AfficheItem {
  __component: string;
  id: number;
  name: string;
  description: string;
  date: string;
  picture: IPicture;
}

export interface AfficheData {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  blocks: AfficheItem[];
}
