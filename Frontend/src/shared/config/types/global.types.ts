import { ReactNode } from "react";

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

export interface WorkingTime {
  id: number;
  weekdayStart: string;
  weekdayFinish: string;
  weekendStart: string;
  weekendFinish: string;
}

interface NameAndLink {
  id: number;
  name: string;
  link: string;
}

export type Instagram = NameAndLink;
export type Address = NameAndLink;
export type Reservation = NameAndLink;
export type Menu = NameAndLink;

export interface GlobalData {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  email: string;
  instagram: Instagram;
  workingTime: WorkingTime;
  address: Address;
  reservation: Reservation;
  menu: Menu;
}

export interface IGlobalDataContext {
  globalData: GlobalData | null;
  setGlobalData: (data: GlobalData) => void;
}

export interface GlobalDataProviderProps {
  children: ReactNode;
  initialGlobalData: GlobalData | null;
}
