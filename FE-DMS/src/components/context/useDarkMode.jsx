import { useEffect, useState } from "react";

export function useDarkMode() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light"; // Default ke "light"
  });

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return { theme, toggleTheme };
}
