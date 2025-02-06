import { Link } from "@/i18n/routing";
import { Button } from "@/shared/button";
import { BaseResponse } from "@/shared/config/types/global.types";
import { LogoBlackFull } from "@/shared/icons/LogoBlackFull";
import { ReserveButton } from "@/shared/reserveButton";
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
          sizes="100vw"
          className="object-cover brightness-50"
          priority
          loading="eager"
        />
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center">
          <LogoBlackFull className="w-2/3 text-white" />
          <p className="relative mt-12 w-full px-4 text-center font-mainPicture text-sm font-bold uppercase tracking-widest text-white sm:text-lg lg:text-xl xl:text-3xl">
            {mainDescription}
          </p>
          <ReserveButton
            buttonText={t("reserve")}
            className="absolute bottom-32 w-2/4 text-lg max-sm:h-12 sm:h-14 md:hidden"
          />
        </div>
      </div>
      {blocks.map((block: HomeItem) => (
        <div
          className={`flex max-md:flex-col ${block.id % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
          key={block.id}
        >
          <div className="relative z-10 h-[50vh] w-full md:h-screen md:w-1/2">
            <Image
              alt={`itemImage-${block.picture.id}`}
              src={`${strapiUrl}${block.picture.url}`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="flex w-full flex-col items-center justify-center gap-5 p-4 max-md:h-[50vh] sm:px-12 md:w-1/2 md:p-10 xl:px-20">
            <h2 className="">{block.title}</h2>
            <p className="text-justify">{block.description}</p>
            {block.title === t("menu") ? (
              <a
                href={block.url}
                target="_blank"
                rel="noopener noreferrer"
                className="custom-tooltip md:self-start"
                data-title={block.title}
                aria-label={block.title}
              >
                <Button>{t("buttonRead")}</Button>
              </a>
            ) : (
              <Link
                className="custom-tooltip md:self-start"
                href={block.url}
                data-title={block.title}
                aria-label={block.title}
              >
                <Button>{t("buttonRead")}</Button>
              </Link>
            )}
          </div>
        </div>
      ))}
    </>
  );
};

export default Home;
