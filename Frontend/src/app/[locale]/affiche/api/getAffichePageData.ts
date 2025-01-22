import { AffichePageRoute } from "@/shared/config/apiPaths";
import { BaseResponse } from "@/shared/config/types/global.types";
import { strapiFetch } from "@/shared/services/strapiFetch";
import { AfficheData } from "../libs/affiche.types";

export const getAffichePageData = async (
  locale: string,
): Promise<BaseResponse<AfficheData>> => {
  const AffichePageUrl: string = AffichePageRoute(locale);
  const response: BaseResponse<AfficheData> = await strapiFetch(AffichePageUrl);
  return response;
};
