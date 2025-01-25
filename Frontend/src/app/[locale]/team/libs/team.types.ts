import { IPicture } from "@/shared/config/types/global.types";

export interface TeamMember {
  id: number;
  name: string;
  description: string;
  position: string;
  instagram: string;
  photo: IPicture;
}

export interface TeamData {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  colleagues: TeamMember[];
}
