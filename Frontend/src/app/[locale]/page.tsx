import { getTranslations, setRequestLocale } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import { getAllPoints } from "@/shared/services/api/getPointData";
import { IPointDTO } from "@/shared/services/types/dto.types";
import { STRAPI_URL } from "@/shared/services/constants";

const PointSelection = async ({
  params: { locale },
}: {
  params: { locale: string };
}) => {
  setRequestLocale(locale);
  const t = await getTranslations("PointSelection");

  // Получаем точки из Strapi
  let points: IPointDTO[] = [];
  try {
    points = await getAllPoints();
  } catch (error) {
    console.error("Error fetching points:", error);
  }

  return (
    <div className="relative flex h-screen flex-col overflow-hidden bg-black text-white">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 z-0 h-full w-full object-cover"
      >
        <source
          src="/b27f092c-ec61-4173-85fc-305e11d8401d.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 z-10 bg-black/70"></div>

      {/* Header */}
      <div className="relative z-20 flex h-[60px] items-center justify-center pt-6">
        <h1 className="text-xl font-bold sm:text-2xl">Tyman Lounge & Bar</h1>
      </div>

      {/* Main Content */}
      <div className="relative z-20 flex flex-1 items-center justify-center px-6">
        <div className="grid w-full max-w-6xl gap-8 md:grid-cols-2 xl:gap-16">
          {points.map((point) => (
            <Link
              key={point.id}
              href={`/${locale}/${point.Slug}`}
              className="group relative overflow-hidden rounded-2xl bg-gray-900 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <div className="relative h-96 w-full md:h-[56vh]">
                <Image
                  src={`${STRAPI_URL}${point.MainImage.url}`}
                  alt={point.Name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h2 className="mb-2 text-3xl font-bold">{point.Name}</h2>
                <p className="mb-4 text-lg opacity-90">{point.Address}</p>
                <p className="mb-4 text-lg opacity-90">{point.Description}</p>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
            </Link>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-20 flex h-[50px] items-center justify-center">
        <div className="text-center text-sm opacity-75">
          {t("chooseLocation")}
        </div>
      </div>
    </div>
  );
};

export default PointSelection;
