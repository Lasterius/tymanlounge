import { getGlobalData } from "@/shared/services/api/getPointData";
import { Footer, Header } from "@/widgets";
import { Analytics } from "@vercel/analytics/next";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  params: { locale: string; point: string };
};

export default async function PointLayout({
  children,
  params: { point },
}: Props) {
  // Загружаем только globalData для Header/Footer
  const globalData = await getGlobalData(point);

  return (
    <>
      <Analytics />
      <Header globalData={globalData} />
      <main className="flex-grow bg-wht text-blck dark:bg-blck dark:text-wht">
        {children}
      </main>
      <Footer globalData={globalData} />
    </>
  );
}
