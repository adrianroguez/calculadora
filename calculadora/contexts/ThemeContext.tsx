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

/**
 * Definicion de los colores del tema claro.
 * Incluye fondos, texto, botones y acentos.
 */
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

/**
 * Definicion de los colores del tema oscuro.
 * Usa tonos oscuros con acentos naranjas.
 */
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

/**
 * Proveedor de contexto para el tema de la aplicacion.
 * Determina el tema inicial segun el esquema del sistema (claro u oscuro).
 * Permite alternar entre ambos temas.
 */
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  // Detecta si el sistema esta en modo claro u oscuro
  const systemScheme = useColorScheme();

  // Define el tipo de tema inicial segun la configuracion del sistema
  const [themeType, setThemeType] = useState<ThemeType>(
    systemScheme === "light" ? "light" : "dark"
  );

  /**
   * Cambia el tema actual alternando entre claro y oscuro.
   * Se puede usar en un boton o toggle del UI.
   */
  const toggleTheme = () =>
    setThemeType((prev) => (prev === "light" ? "dark" : "light"));

  // Selecciona el tema actual segun el estado
  const theme = themeType === "light" ? lightTheme : darkTheme;

  return (
    <ThemeContext.Provider value={{ theme, themeType, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * Hook personalizado para acceder al contexto de tema.
 * Devuelve el tema actual, su tipo y la funcion para alternarlo.
 */
export const useTheme = () => useContext(ThemeContext);
