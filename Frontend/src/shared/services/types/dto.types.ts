export type TLocale = "en" | "ru" | "sr";

export type TPointSlug = "waterfront" | "dorcol";

export interface IBaseResponse<T> {
  data: T;
  meta: object;
}

export interface IGeneralPointDTO {
  id: number;
  documentId: string;
  Slug: TPointSlug;
  Name: string;
}

export interface IPictureDTO {
  url: string;
  documentId: string;
  id: number;
}

export interface IDetailedPictureDTO {
  id: number;
  files: {
    id: number;
    documentId: string;
    name: string;
    alternativeText: string | null;
    caption: string | null;
    width: number;
    height: number;
    formats: Record<string, unknown>;
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl: string | null;
    provider: string;
    provider_metadata: Record<string, unknown> | null;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}

export interface IPointDTO extends IGeneralPointDTO {
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  Address: string;
  Description: string;
  isActive: boolean;
  MainImage: {
    url: string;
    documentId: string;
    id: number;
  };
}

export interface IGeneralDataDTO {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  Title: string;
  point: IPointDTO;
  locale?: TLocale;
}

export interface IHomeMainItemDTO {
  id: number;
  title: string;
  description: string;
  url: string;
  picture: IPictureDTO;
}

export interface IAfficheItemDTO {
  id: number;
  name: string;
  description: string;
  date: string;
  picture: IPictureDTO;
}

export interface IHomeDTO extends IGeneralDataDTO {
  mainDescription: string;
  mainItem: IHomeMainItemDTO[];
  mainPicture: IPictureDTO;
}

export interface IGalleryDTO {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  Title: string;
  points: IPointDTO[];
  Pictures: IDetailedPictureDTO[];
  locale?: TLocale;
}

export interface IAfficheDTO extends IGeneralDataDTO {
  afficheItem: IAfficheItemDTO[];
}

export interface ITeamDTO extends IGeneralDataDTO {
  Decription: string;
  Pictures: IDetailedPictureDTO[];
}

export interface IWorkingTimeDTO {
  id: number;
  weekdayStart: string;
  weekdayFinish: string;
  weekendStart: string;
  weekendFinish: string;
}

export interface INameAndLinkDTO {
  id: number;
  name: string;
  link: string;
}

export interface IGlobalDataDTO {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  Title: string;
  points: IPointDTO[];
  Email: string;
  WorkingTime: IWorkingTimeDTO;
  Instagram: INameAndLinkDTO;
  Address: INameAndLinkDTO;
  Reservation: INameAndLinkDTO;
  Menu: INameAndLinkDTO;
  localizations: unknown[];
}
