"use client";

import { Moon } from "@/shared/icons/Moon";
import { Sun } from "@/shared/icons/Sun";
import { useLayoutEffect, useState } from "react";

export const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useLayoutEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const darkMode = savedTheme === "dark";

    // Устанавливаем тему сразу при загрузке страницы
    document.documentElement.classList.toggle("dark", darkMode);
    setIsDarkMode(darkMode);
  }, []);

  const toggleTheme = () => {
    const newTheme = isDarkMode ? "light" : "dark";
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className="dark:bg-wht relative flex h-8 w-16 items-center rounded-full bg-blck p-1 transition-colors duration-300"
    >
      {/* Иконка солнца для светлой темы */}
      <Sun className="absolute left-1 h-5 w-5 text-blck transition-opacity duration-300" />

      {/* Иконка луны для темной темы */}
      <Moon className="text-wht absolute right-1 h-5 w-5 transition-opacity duration-300" />

      {/* Переключатель */}
      <span
        className={`ring-wht dark:bg-wht absolute h-6 w-6 transform rounded-full bg-blck shadow-md ring-2 transition-transform duration-300 dark:ring-blck ${
          isDarkMode ? "translate-x-8" : "translate-x-0"
        }`}
      ></span>
    </button>
  );
};
