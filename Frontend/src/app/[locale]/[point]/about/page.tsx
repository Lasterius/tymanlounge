import { getTranslations, setRequestLocale } from "next-intl/server";
import { getTeamPageData } from "@/shared/services/api/getPointData";
import { Metadata } from "next";
import { MembersList } from "@/widgets/membersList/MembersList";

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
  const t = await getTranslations({ locale, namespace: "TeamPage" });
  // Временно используем простые метаданные, чтобы избежать ошибок API
  const pointName = point === "waterfront" ? "Waterfront" : "Dorcol";

  return {
    title: `${t("title")} - ${pointName} - Tyman Lounge & Bar`,
    description: `Meet our professional team at Tyman Lounge & Bar at ${pointName}. Our experienced staff is dedicated to providing you with the best hookah and cocktail experience in Belgrade.`,
    keywords: `Tyman Lounge team, ${pointName}, bar staff Belgrade, hookah experts, cocktail specialists, professional service`,
    openGraph: {
      title: `${t("title")} - ${pointName} - Tyman Lounge & Bar`,
      description: `Meet our professional team at Tyman Lounge & Bar at ${pointName}.`,
      type: "website",
      locale: locale,
    },
  };
}

const About = async ({
  params: { locale, point },
}: {
  params: { locale: string; point: string };
}) => {
  setRequestLocale(locale);

  const team = await getTeamPageData(locale, point);

  const t = await getTranslations("TeamPage");

  return (
    // <div className="min-h-screen">
    //   {/* Main Content - Split Layout */}
    //   <div className="flex min-h-screen flex-col lg:flex-row">
    //     {/* Left Side - Text Content */}
    //     <div className="flex w-full flex-col justify-center px-6 py-16 lg:w-1/2 lg:px-12">
    //       <div className="mx-auto max-w-2xl">
    //         <h1 className="mb-8 text-4xl font-bold sm:text-5xl lg:text-6xl">
    //           {t("title")}
    //         </h1>
    //         <div className="space-y-6 text-lg leading-relaxed">
    //           {team.Decription.split("\n").map((paragraph, index) => (
    //             <p key={index} className="text-justify">
    //               {paragraph.trim()}
    //             </p>
    //           ))}
    //         </div>
    //       </div>
    //     </div>

    //     {/* Right Side - Photos Grid */}
    //     <div className="flex w-full items-center justify-center p-6 lg:w-1/2 lg:p-12">
    //       <div className="grid w-full max-w-2xl grid-cols-3 gap-4">
    //         {team.Pictures.slice(0, 9).map((picture, index) => (
    //           <div
    //             key={picture.id}
    //             className="group relative aspect-square overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
    //           >
    //             <Image
    //               src={`${process.env.STRAPI_URL}${picture.files.url}`}
    //               alt={`Team photo ${index + 1}`}
    //               width={picture.files.width}
    //               height={picture.files.height}
    //               className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
    //               loading={index < 3 ? "eager" : "lazy"}
    //               priority={index < 3}
    //             />
    //           </div>
    //         ))}
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div className="pb-12 pt-24">
      <h1 className="mb-10 text-center">{t("title")}</h1>
      <MembersList pictures={team.Pictures} />
      <div className="mx-4 mb-0 mt-12 max-w-7xl rounded-xl bg-drkgrn p-4 text-justify text-wht transition-colors md:mx-auto">
        {team.Decription}
      </div>
    </div>
  );
};

export default About;
