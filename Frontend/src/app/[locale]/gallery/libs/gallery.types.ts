import { IPicture } from "@/shared/config/types/global.types";

export interface IPictures {
  id: number;
  files: IPicture;
}

export interface GalleryData {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  Pictures: IPictures[];
}
