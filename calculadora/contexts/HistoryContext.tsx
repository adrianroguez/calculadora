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

export const HistoryProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const stored = await AsyncStorage.getItem("calculator_history");
        if (stored) setHistory(JSON.parse(stored));
      } catch (err) {
        console.log("Error cargando historial:", err);
      }
    })();
  }, []);

  const saveHistory = async (newHistory: HistoryItem[]) => {
    setHistory(newHistory);
    await AsyncStorage.setItem(
      "calculator_history",
      JSON.stringify(newHistory)
    );
  };

  const addToHistory = (expression: string, result: string) => {
    setHistory((prev) => {
      const newItem = { expression, result, timestamp: Date.now() };
      const updated = [newItem, ...prev].slice(0, 100);
      AsyncStorage.setItem("calculator_history", JSON.stringify(updated));
      return updated;
    });
  };

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

export const useHistory = () => {
  const ctx = useContext(HistoryContext);
  if (!ctx) throw new Error("useHistory debe usarse dentro de HistoryProvider");
  return ctx;
};
