let isDarkMode = false;

export const setIsDarkMode = (theme: "light" | "dark") => {
  isDarkMode = theme !== "light";
};

export const getIsDarkMode = () => isDarkMode;
