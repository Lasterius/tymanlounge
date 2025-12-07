import "@/shared/globals.css";
import { GoogleTagManager } from "@/widgets";
import { EB_Garamond, Roboto, Rubik_Mono_One, Cormorant_Garamond, Montserrat } from "next/font/google";
import { ReactNode } from "react";

const rubikMonoOne = Rubik_Mono_One({
  weight: "400",
  subsets: ["latin", "cyrillic"],
  variable: "--font-rubik",
});

const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin", "cyrillic"],
});

const garamond = EB_Garamond({
  weight: ["400", "700"],
  subsets: ["latin", "cyrillic"],
  variable: "--font-eb-garamond",
});

const cormorantGaramond = Cormorant_Garamond({
  weight: ["400", "700"],
  subsets: ["latin", "cyrillic"],
  variable: "--font-cormorant-garamond",
});

const montserrat = Montserrat({
  weight: ["400", "700"],
  subsets: ["latin", "cyrillic"],
  variable: "--font-montserrat",
});
type Props = {
  children: ReactNode;
  params: { locale?: string };
};

// Since we have a `not-found.tsx` page on the root, a layout file
// is required, even if it's just passing children through.
export default function RootLayout({ children, params }: Props) {
  const lang = params.locale || "en";
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

  return (
    <html lang={lang}>
      <body
        className={`${roboto.className} ${rubikMonoOne.variable} ${garamond.variable} ${cormorantGaramond.variable} ${montserrat.variable} flex min-h-screen flex-col text-base md:text-lg`}
      >
        {/* Google Tag Manager (noscript) */}
        {process.env.NODE_ENV === "production" && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        )}
        {/* End Google Tag Manager (noscript) */}
        <GoogleTagManager />
        {children}
        <script
          dangerouslySetInnerHTML={{
            __html: `
            (function() {
              const theme = localStorage.getItem('theme') || 'light';
              document.documentElement.classList.add(theme);
            })();
          `,
          }}
        />
      </body>
    </html>
  );
}
