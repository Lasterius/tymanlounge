import { BaseResponse } from "@/shared/config/types/global.types";
import { AfficheList } from "@/widgets/afficheList";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { getAffichePageData } from "./api/getAffichePageData";
import { AfficheData, AfficheItem } from "./libs/affiche.types";

const Affiche = async ({
  params: { locale },
}: {
  params: { locale: string };
}) => {
  const apiData: BaseResponse<AfficheData> = await getAffichePageData(locale);
  const { blocks } = apiData.data;
  const upcomingBlock: AfficheItem | undefined = blocks.at(-1);
  const reversedBlocks: AfficheItem[] = blocks.slice(0, -1).reverse();
  const t = await getTranslations("AffichePage");
  const strapiUrl = process.env.STRAPI_URL;

  return (
    <>
      <div className="flex h-screen w-full">
        <div className="flex w-1/2 flex-col items-start justify-center gap-5 px-28 py-32">
          <h3 className="mb-8 border-b-4 border-solid border-drkgrn dark:border-grn">
            {t("event")}
          </h3>
          <h2>{upcomingBlock?.name}</h2>
          <p className="italic">{upcomingBlock?.date}</p>
          <p>{upcomingBlock?.description}</p>
        </div>
        <div className="relative z-10 h-screen w-1/2">
          <Image
            alt={upcomingBlock?.name || "upcoming event"}
            src={`${strapiUrl}${upcomingBlock?.picture.url}`}
            fill
            sizes="50vw"
            className="object-cover"
            priority
          />
        </div>
      </div>
      {/* <ul className="flex">
        {reversedBlocks.map((block: IBlock) => (
          <li key={block.id} className="relative h-[50vh] w-1/3">
            <Image
              alt={block.name}
              src={`${strapiUrl}${block.picture.url}`}
              layout="fill"
              objectFit="cover"
              className="brightness-50"
            ></Image>
            <div className="text-wht absolute inset-0 flex flex-col justify-center gap-2 p-20">
              <h4 className="border-wht w-auto border-b border-solid">
                {block.name}
              </h4>
              <p>{block.date}</p>
              <p>{block.description}</p>
            </div>
          </li>
        ))}
      </ul> */}
      <AfficheList
        blocks={reversedBlocks}
        strapiUrl={strapiUrl}
        buttonText={t("buttonLoad")}
      />
    </>
  );
};

export default Affiche;
