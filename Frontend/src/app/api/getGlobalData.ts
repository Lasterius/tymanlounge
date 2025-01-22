import { BaseResponse, GlobalData } from "@/shared/config/types/global.types";
import { GlobalDataRoute } from "../libs/routes";
import { strapiFetch } from "./strapiFetch";

export const getGlobalData = async (): Promise<BaseResponse<GlobalData>> => {
  const globalDataUrl: string = GlobalDataRoute();
  const response: BaseResponse<GlobalData> = await strapiFetch(globalDataUrl);
  return response;
};
