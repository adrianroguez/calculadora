import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type HistoryItem = {
  expression: string;
  result: string;
  timestamp: number;
};

type HistoryContextType = {
  history: HistoryItem[];
  addToHistory: (expression: string, result: string) => void;
  clearHistory: () => void;
};

const HistoryContext = createContext<HistoryContextType | undefined>(undefined);

/**
 * Proveedor de contexto que maneja el historial de calculos.
 * Guarda y carga los datos usando AsyncStorage para persistencia.
 * Ofrece funciones para agregar y limpiar el historial.
 */
export const HistoryProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  /**
   * useEffect para cargar el historial guardado al iniciar la aplicacion.
   * Si hay datos en AsyncStorage, los parsea y los establece en el estado.
   */
  useEffect(() => {
    (async () => {
      try {
        const stored = await AsyncStorage.getItem("calculator_history");
        if (stored) setHistory(JSON.parse(stored)); // Carga historial guardado
      } catch (err) {
        console.log("Error cargando historial:", err);
      }
    })();
  }, []);

  /**
   * Guarda un nuevo historial en AsyncStorage y actualiza el estado local.
   * Reemplaza completamente el historial anterior.
   */
  const saveHistory = async (newHistory: HistoryItem[]) => {
    setHistory(newHistory);
    await AsyncStorage.setItem(
      "calculator_history",
      JSON.stringify(newHistory)
    );
  };

  /**
   * Agrega un nuevo calculo al historial.
   * Limita el historial a los ultimos 100 elementos para evitar sobrecarga.
   */
  const addToHistory = (expression: string, result: string) => {
    setHistory((prev) => {
      const newItem = { expression, result, timestamp: Date.now() };
      const updated = [newItem, ...prev].slice(0, 100); // Mantiene solo los ultimos 100
      AsyncStorage.setItem("calculator_history", JSON.stringify(updated)); // Persiste los datos
      return updated;
    });
  };

  /**
   * Limpia el historial completamente.
   * Llama a saveHistory con un arreglo vacio.
   */
  const clearHistory = () => {
    saveHistory([]);
  };

  return (
    <HistoryContext.Provider
      value={{ history, addToHistory, clearHistory }}
    >
      {children}
    </HistoryContext.Provider>
  );
};

/**
 * Hook personalizado para acceder al contexto del historial.
 * Lanza un error si se usa fuera del HistoryProvider.
 */
export const useHistory = () => {
  const ctx = useContext(HistoryContext);
  if (!ctx) throw new Error("useHistory debe usarse dentro de HistoryProvider");
  return ctx;
};
