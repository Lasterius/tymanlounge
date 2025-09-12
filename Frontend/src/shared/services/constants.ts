export const STRAPI_URL = process.env.STRAPI_URL || "http://localhost:1337";

export const languages = [
  { id: "sr", name: "Serbian" },
  { id: "en", name: "English" },
  { id: "ru", name: "Russian" },
];

export const navItems = [
  { id: 0, label: "home", href: "" },
  { id: 1, label: "menu", href: null },
  { id: 2, label: "affiche", href: "/affiche" },
  { id: 3, label: "gallery", href: "/gallery" },
  { id: 4, label: "about", href: "/about" },
];
