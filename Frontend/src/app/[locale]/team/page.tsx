import { BaseResponse } from "@/shared/config/types/global.types";
import { MembersList } from "@/widgets/membersList";
import { getTranslations } from "next-intl/server";
import { getTeamPageData } from "./api/getTeamPageData";
import { TeamData } from "./libs/team.types";

const Team = async ({ params: { locale } }: { params: { locale: string } }) => {
  const apiData: BaseResponse<TeamData> = await getTeamPageData(locale);
  const { colleagues } = apiData.data;

  const t = await getTranslations("TeamPage");

  return (
    <>
      <div className="pb-12 pt-24">
        <h1 className="mb-10 text-center">{t("title")}</h1>
        <MembersList colleagues={colleagues} />
      </div>
    </>
  );
};

export default Team;
