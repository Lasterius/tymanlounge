import { IPicture } from "@/shared/config/types/global.types";

export interface IBlock {
  id: number;
  name: string;
  description: string;
  date: string;
  picture: IPicture;
}
