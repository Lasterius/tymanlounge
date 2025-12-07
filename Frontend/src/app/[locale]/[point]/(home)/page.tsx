import { Link } from "@/i18n/routing";
import { Button, ReserveButton } from "@/shared/ui";
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
    title: pointName === "Waterfront" ? t("titleWF") : t("titleDorcol"),
    description: pointName === "Waterfront" ? t("descriptionWF") : t("descriptionDorcol"),
    keywords: `nargila bar Beograd, nargile Beograd, nargila lounge bar, nargila Beograd na Vodi, kokteli Beograd, lounge atmosfera, Tyman na Vodi, shisha bar Belgrade, hookah Belgrade, premium hookah, signature cocktails, Belgrade Waterfront, lounge bar, cocktail bar, кальянная Белград, кальян Белград, Tyman na Vode, коктейли Белград, кальянная Белграде на Воде`,
    openGraph: {
      title: pointName === "Waterfront" ? t("titleWF") : t("titleDorcol"),
      description: pointName === "Waterfront" ? t("descriptionWF") : t("descriptionDorcol"),
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
  const { h1_title, h2_title, mainItem, mainPicture } = home;

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
          <div className="flex items-center justify-center gap-6 px-2">
            <Image src={'/LogoT.png'} alt="logo" width={200} height={200} className="w-1/4" />
            <h1 className="font-main relative w-[40%] text-center text-base font-bold uppercase tracking-widest text-white sm:text-2xl lg:text-3xl xl:text-4xl">
              {h1_title}
            </h1>
          </div>
          <h2 className="font-mainPicture relative mt-12 w-3/4 px-4 text-center text-xs font-bold uppercase tracking-widest text-white sm:text-sm lg:text-lg xl:text-xl">
            {h2_title}
          </h2>
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
