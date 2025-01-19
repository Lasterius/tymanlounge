export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto flex h-52 w-full flex-col items-center bg-wht p-4 dark:bg-blck">
      <span className="block h-[2px] w-full bg-blck dark:bg-wht" />
      <div className="text-blck dark:text-wht">
        График работы, адрес, инста, почта
      </div>
      <p className="text-blck dark:text-wht">
        © Tyman Lounge & Bar. All rights reserved.
      </p>
      <p className="text-blck dark:text-wht">
        Development by Tsivilev Konstantin
      </p>
      <p className="text-blck dark:text-wht">2024 — {currentYear}</p>
    </footer>
  );
};
