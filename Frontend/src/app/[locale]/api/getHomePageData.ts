import { HomePageRoute } from "@/shared/config/apiPaths";
import { BaseResponse } from "@/shared/config/types/global.types";
import { strapiFetch } from "@/shared/services/strapiFetch";
import { HomeData } from "../libs/home-page.types";

export const getHomePageData = async (
  locale: string,
): Promise<BaseResponse<HomeData>> => {
  const HomePageUrl: string = HomePageRoute(locale);
  const response: BaseResponse<HomeData> = await strapiFetch(HomePageUrl);
  return response;
};
