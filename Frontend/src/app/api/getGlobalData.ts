import { GlobalDataRoute } from "@/shared/config/apiPaths";
import { BaseResponse, GlobalData } from "@/shared/config/types/global.types";
import { strapiFetch } from "../../shared/services/strapiFetch";

export const getGlobalData = async (): Promise<BaseResponse<GlobalData>> => {
  const globalDataUrl: string = GlobalDataRoute();
  const response: BaseResponse<GlobalData> = await strapiFetch(globalDataUrl);
  return response;
};
