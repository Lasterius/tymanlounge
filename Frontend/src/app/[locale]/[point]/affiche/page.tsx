import { AfficheList } from "@/widgets";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Image from "next/image";
import { Metadata } from "next";
import { getAffichePageData } from "@/shared/services/api/getPointData";
import { IAfficheItemDTO } from "@/shared/services/types/dto.types";

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
  const t = await getTranslations({ locale, namespace: "AffichePage" });
  // Временно используем простые метаданные, чтобы избежать ошибок API
  const pointName = point === "waterfront" ? "Waterfront" : "Dorcol";

  return {
    title: `${t("event")} - ${pointName} - Tyman Lounge & Bar`,
    description: `Discover upcoming events and special occasions at Tyman Lounge & Bar at ${pointName}. Join us for unforgettable evenings with premium hookah and signature cocktails.`,
    keywords: `events Belgrade, ${pointName}, hookah bar events, Tyman Lounge events, Belgrade nightlife, special occasions, bar events`,
    openGraph: {
      title: `${t("event")} - ${pointName} - Tyman Lounge & Bar`,
      description: `Discover upcoming events and special occasions at Tyman Lounge & Bar at ${pointName}.`,
      type: "website",
      locale: locale,
    },
  };
}

const Affiche = async ({
  params: { locale, point },
}: {
  params: { locale: string; point: string };
}) => {
  setRequestLocale(locale);

  // Загружаем только affiche данные
  const affiche = await getAffichePageData(locale, point);
  const { afficheItem: blocks } = affiche;

  const upcomingBlock: IAfficheItemDTO | undefined = blocks.at(-1);
  const reversedBlocks: IAfficheItemDTO[] = blocks.slice(0, -1).reverse();
  const t = await getTranslations("AffichePage");
  const strapiUrl = process.env.STRAPI_URL || "http://localhost:1337";

  return (
    <>
      <div className="flex h-screen w-full flex-col-reverse lg:flex-row">
        <div className="flex h-[50vh] flex-col items-start justify-center gap-5 px-5 py-5 min-[400px]:px-14 min-[500px]:px-20 md:px-24 lg:h-screen lg:w-1/2 lg:px-10 lg:py-32 xl:px-28">
          <h3 className="mb-8 border-b-4 border-solid border-drkgrn dark:border-grn">
            {t("event")}
          </h3>
          <h2>{upcomingBlock?.name}</h2>
          <p className="italic">{upcomingBlock?.date}</p>
          <p>{upcomingBlock?.description}</p>
        </div>
        <div className="relative z-10 h-[50vh] lg:h-screen lg:w-1/2">
          <Image
            alt={upcomingBlock?.name || "upcoming event"}
            src={`${strapiUrl}${upcomingBlock?.picture.url}`}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
            priority
            quality={85}
          />
        </div>
      </div>
      <AfficheList
        blocks={reversedBlocks}
        strapiUrl={strapiUrl}
        buttonText={t("buttonLoad")}
      />
    </>
  );
};

export default Affiche;
