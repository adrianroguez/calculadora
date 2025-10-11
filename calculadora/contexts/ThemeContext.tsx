import React, { createContext, useContext, useState, ReactNode } from "react";
import { useColorScheme } from "react-native";

export type ThemeType = "light" | "dark";

type Theme = {
  background: string;
  text: string;
  historyText: string;
  sciOperatorBtnText: string;
  sciOperatorBtnBackground: string;
  operatorBtnText: string;
  operatorBtnBackground: string;
  buttonBackground: string;
  buttonText: string;
  primaryAccentColor: string;
  secondaryAccentColor: string;
  spOperatorBtnText: string;
  spOperatorBtnBackground: string;
  equalsBtnBackground: string;
};

export const lightTheme: Theme = {
  background: "#FFFFFF",
  text: "#000000",
  historyText: "#333333",
  buttonBackground: "#E0E0E0",
  buttonText: "#000000",
  primaryAccentColor: "#007AFF",
  secondaryAccentColor: "#5AC8FA",
  operatorBtnBackground: "#007AFF",
  operatorBtnText: "#FFFFFF",
  sciOperatorBtnBackground: "#CFCFCF",
  sciOperatorBtnText: "#444444",
  spOperatorBtnBackground: "#5AC8FA",
  spOperatorBtnText: "#000000",
  equalsBtnBackground: "#0022FF",
};

export const darkTheme: Theme = {
  background: "#000000",
  text: "#FFFFFF",
  historyText: "#AAAAAA",
  buttonBackground: "#333333",
  buttonText: "#FFFFFF",
  primaryAccentColor: "#FF9500",
  secondaryAccentColor: "#FFc04D",
  operatorBtnBackground: "#FF9500",
  operatorBtnText: "#FFFFFF",
  sciOperatorBtnBackground: "#555555",
  sciOperatorBtnText: "#CCCCCC",
  spOperatorBtnBackground: "#FFc04D",
  spOperatorBtnText: "#000000",
  equalsBtnBackground: "#FF5500",
};

const ThemeContext = createContext<{
  theme: Theme;
  themeType: ThemeType;
  toggleTheme: () => void;
}>({
  theme: darkTheme,
  themeType: "dark",
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const systemScheme = useColorScheme();
  const [themeType, setThemeType] = useState<ThemeType>(
    systemScheme === "light" ? "light" : "dark"
  );

  const toggleTheme = () =>
    setThemeType((prev) => (prev === "light" ? "dark" : "light"));

  const theme = themeType === "light" ? lightTheme : darkTheme;

  return (
    <ThemeContext.Provider value={{ theme, themeType, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
