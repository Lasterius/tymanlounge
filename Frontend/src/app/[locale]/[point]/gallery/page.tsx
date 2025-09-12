import { GalleryList } from "@/widgets";
import { getGalleryPageData } from "@/shared/services/api/getPointData";
import { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

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
  // Временно используем простые метаданные, чтобы избежать ошибок API
  const t = await getTranslations({ locale, namespace: "GalleryPage" });
  const pointName = point === "waterfront" ? "Waterfront" : "Dorcol";

  return {
    title: `${t("title")} - ${pointName} - Tyman Lounge & Bar`,
    description: `Explore our gallery and see the beautiful atmosphere of Tyman Lounge & Bar at ${pointName}. Discover our premium hookah lounge and signature cocktails in Belgrade.`,
    keywords: `Tyman Lounge gallery, ${pointName}, hookah bar photos, Belgrade bar gallery, lounge atmosphere, bar interior photos`,
    openGraph: {
      title: `${t("title")} - ${pointName} - Tyman Lounge & Bar`,
      description: `Explore our gallery and see the beautiful atmosphere of Tyman Lounge & Bar at ${pointName}.`,
      type: "website",
    },
  };
}

const Gallery = async ({
  params: { locale, point },
}: {
  params: { locale: string; point: string };
}) => {
  setRequestLocale(locale);

  // Загружаем только gallery данные
  const gallery = await getGalleryPageData(point);
  const { Pictures } = gallery;

  const strapiUrl = process.env.STRAPI_URL || "http://localhost:1337";

  return (
    <div className="pt-14">
      <GalleryList pictures={Pictures} strapiUrl={strapiUrl} />
    </div>
  );
};

export default Gallery;
