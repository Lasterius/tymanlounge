import Link from "next/link";
import "@/shared/globals.css";

export default function RootNotFound() {
  return (
    <html>
      <head>
        <title>404 - Page Not Found | Tyman Lounge</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="bg-wht text-blck dark:bg-blck dark:text-wht">
        <div className="flex min-h-screen flex-col items-center justify-center gap-10 px-4">
          <div className="text-center">
            <h1 className="mb-4 text-6xl font-bold text-drkgrn">404</h1>
            <h2 className="mb-6 font-heading text-2xl">Page Not Found</h2>
            <h2 className="mb-6 text-xl font-bold sm:text-2xl">
              Tyman Lounge & Bar
            </h2>
            <p className="max-w-md text-center text-gr">
              The page you are looking for does not exist or has been moved.
            </p>
          </div>

          <Link
            href="/en"
            className="flex h-12 w-48 items-center justify-center rounded-xl border-2 border-solid border-blck bg-blck text-center font-bold uppercase text-wht transition-colors hover:bg-wht hover:text-blck dark:bg-wht dark:text-blck hover:dark:bg-blck hover:dark:text-wht"
          >
            Go to Home
          </Link>
        </div>
      </body>
    </html>
  );
}
