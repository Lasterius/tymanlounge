"use client";

import { Moon } from "@/shared/icons/Moon";
import { Sun } from "@/shared/icons/Sun";
import { useLayoutEffect, useState } from "react";

export const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useLayoutEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const darkMode = savedTheme === "dark";

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
      className="group relative flex h-8 w-16 items-center rounded-full bg-blck p-1 transition-colors duration-300 dark:bg-wht"
    >
      <Sun className="absolute left-1 h-5 w-5 text-blck transition-opacity duration-300" />

      <Moon className="absolute right-1 h-5 w-5 text-wht transition-opacity duration-300" />

      <span
        className={`absolute h-6 w-6 transform rounded-full bg-blck shadow-md ring-2 ring-wht transition-transform duration-300 dark:bg-wht dark:ring-blck ${
          isDarkMode
            ? "translate-x-8 group-hover:translate-x-7"
            : "translate-x-0 group-hover:translate-x-1"
        }`}
      ></span>
    </button>
  );
};
