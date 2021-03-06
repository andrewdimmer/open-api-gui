import React from "react";
import { setIsDarkMode } from "../helpers/globalVariables";

export const useDarkMode = () => {
  const [theme, setTheme] = React.useState<"light" | "dark">("light");
  const [componentMounted, setComponentMounted] = React.useState(false);
  const setMode = (mode: "light" | "dark") => {
    window.localStorage.setItem("theme", mode);
    setTheme(mode);
    setIsDarkMode(mode);
  };

  const toggleTheme = () => {
    if (theme === "light") {
      setMode("dark");
    } else {
      setMode("light");
    }
  };

  React.useEffect(() => {
    const localTheme = window.localStorage.getItem("theme") as
      | "light"
      | "dark"
      | null;
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches &&
    !localTheme
      ? setMode("dark")
      : localTheme
      ? setTheme(localTheme)
      : setMode("light");
    setComponentMounted(true);
  }, []);

  return { theme, toggleTheme, componentMounted };
};
