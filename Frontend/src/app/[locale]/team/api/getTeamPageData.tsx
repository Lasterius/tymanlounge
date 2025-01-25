import { TeamPageRoute } from "@/shared/config/apiPaths";
import { BaseResponse } from "@/shared/config/types/global.types";
import { strapiFetch } from "@/shared/services/strapiFetch";
import { TeamData } from "../libs/team.types";

export const getTeamPageData = async (
  locale: string,
): Promise<BaseResponse<TeamData>> => {
  const TeamPageUrl: string = TeamPageRoute(locale);
  const response: BaseResponse<TeamData> = await strapiFetch(TeamPageUrl);
  return response;
};
