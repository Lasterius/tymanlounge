import { Link } from "@/i18n/routing";
import { Button } from "@/shared/button";
import { BaseResponse } from "@/shared/config/types/global.types";
import { LogoBlackFull } from "@/shared/icons/LogoBlackFull";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Image from "next/image";
import { getHomePageData } from "./api/getHomePageData";
import { HomeData, HomeItem } from "./libs/home-page.types";

const Home = async ({ params: { locale } }: { params: { locale: string } }) => {
  setRequestLocale(locale);

  const t = await getTranslations("HomePage");
  const apiData: BaseResponse<HomeData> = await getHomePageData(locale);
  const { mainDescription, blocks, mainPicture } = apiData.data;
  const strapiUrl = process.env.STRAPI_URL;

  return (
    <>
      <div className="relative z-0 h-screen w-full overflow-hidden">
        <Image
          alt="mainBg"
          src={`${strapiUrl}${mainPicture.url}`}
          fill
          className="object-cover brightness-50"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center">
          <LogoBlackFull className="w-2/3 text-white shadow-lg" />
          <p className="relative mt-12 w-full px-4 text-center font-mainPicture text-3xl font-bold uppercase tracking-widest text-white">
            {mainDescription}
          </p>
        </div>
      </div>
      {blocks.map((block: HomeItem) => (
        <div
          className={`flex ${block.id % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
          key={block.id}
        >
          <div className="flex w-1/2 flex-col items-center justify-center gap-5 px-20">
            <h2 className="">{block.title}</h2>
            <p className="text-justify">{block.description}</p>
            {block.title === "Menu" ? (
              <a
                href={block.url}
                target="_blank"
                rel="noopener noreferrer"
                className="self-start"
              >
                <Button>{t("buttonRead")}</Button>
              </a>
            ) : (
              <Link className="self-start" href={block.url}>
                <Button>{t("buttonRead")}</Button>
              </Link>
            )}
          </div>
          <div className="relative z-10 h-screen w-1/2">
            <Image
              alt={`itemImage-${block.picture.id}`}
              src={`${strapiUrl}${block.picture.url}`}
              fill
              className="object-cover"
              sizes="50vw"
            />
          </div>
        </div>
      ))}
    </>
  );
};

export default Home;
