import { Link } from "@/i18n/routing";
import { Button, ReserveButton } from "@/shared/ui";
import { LogoBlackFull } from "@/shared/icons/LogoBlackFull";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Image from "next/image";
import { Metadata } from "next";
import {
  getHomePageData,
  getGlobalData,
} from "@/shared/services/api/getPointData";
import { IHomeMainItemDTO } from "@/shared/services/types/dto.types";
import { STRAPI_URL } from "@/shared/services/constants";
// Генерируем статические параметры для всех комбинаций локалей и точек
export async function generateStaticParams() {
  const locales = ["en", "ru", "sr"];
  const points = ["waterfront", "dorcol"];

  return locales.flatMap((locale) =>
    points.map((point) => ({ locale, point })),
  );
}

export async function generateMetadata({
  params: { locale, point },
}: {
  params: { locale: string; point: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "HomePage" });
  const pointName = point === "waterfront" ? "Waterfront" : "Dorcol";

  return {
    title: `${t("title")} - ${pointName} - Tyman Lounge & Bar`,
    description: `Experience the ultimate hookah and cocktail lounge at Tyman Lounge & Bar in ${pointName}. Over 320 hookah blends and signature cocktails in the heart of Belgrade.`,
    keywords: `Tyman Lounge, ${pointName}, hookah bar Belgrade, Russian hookah, signature cocktails, lounge bar, Belgrade nightlife, premium hookah, cocktail bar`,
    openGraph: {
      title: `${t("title")} - ${pointName} - Tyman Lounge & Bar`,
      description: `Experience the ultimate hookah and cocktail lounge at Tyman Lounge & Bar in ${pointName}.`,
      type: "website",
      locale: locale,
    },
  };
}

const Home = async ({
  params: { locale, point },
}: {
  params: { locale: string; point: string };
}) => {
  setRequestLocale(locale);

  const t = await getTranslations("HomePage");

  // Временное исправление: если point - это имя файла, извлекаем slug
  const actualPointSlug = point;

  // Получаем home данные и globalData из Strapi
  const [home, globalData] = await Promise.all([
    getHomePageData(locale, actualPointSlug),
    getGlobalData(actualPointSlug),
  ]);
  const { mainDescription, mainItem, mainPicture } = home;

  return (
    <>
      <div className="relative z-0 h-screen w-full overflow-hidden">
        <Image
          alt="mainBg"
          src={`${STRAPI_URL}${mainPicture?.url}`}
          fill
          sizes="100vw"
          className="object-cover brightness-50"
          priority
          loading="eager"
        />
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center">
          <LogoBlackFull className="w-2/3 text-white" />
          <p className="font-main relative mt-12 w-full px-4 text-center text-sm font-bold uppercase tracking-widest text-white sm:text-lg lg:text-xl xl:text-3xl">
            {mainDescription}
          </p>
          <ReserveButton
            buttonText={t("reserve")}
            className="absolute bottom-32 w-2/4 text-lg max-sm:h-12 sm:h-14 md:hidden"
            globalData={globalData}
          />
        </div>
      </div>
      {mainItem?.map((item: IHomeMainItemDTO) => (
        <div
          className={`flex max-md:flex-col ${item.id % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
          key={item.id}
        >
          <div className="relative z-10 h-[50vh] w-full md:h-screen md:w-1/2">
            <Image
              alt={`itemImage-${item.picture.id}`}
              src={`${STRAPI_URL}${item.picture?.url}`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              quality={80}
              loading="lazy"
            />
          </div>
          <div className="flex w-full flex-col items-center justify-center gap-5 p-4 max-md:h-[50vh] sm:px-12 md:w-1/2 md:p-10 xl:px-20">
            <h2 className="">{item.title}</h2>
            <p className="text-justify">{item.description}</p>
            {item.title === t("menu") ? (
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="custom-tooltip md:self-start"
                data-title={item.title}
                aria-label={item.title}
              >
                <Button>{t("buttonRead")}</Button>
              </a>
            ) : (
              <Link
                className="custom-tooltip md:self-start"
                href={`/${point}/${item.url}`}
                data-title={item.title}
                aria-label={item.title}
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
