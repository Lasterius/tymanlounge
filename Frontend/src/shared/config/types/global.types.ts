export interface IPicture {
  id: number;
  documentId: string;
  url: string;
}

export type Locale = "en" | "ru" | "sr";

export interface BaseResponse<T> {
  data: T;
  meta: object;
}
