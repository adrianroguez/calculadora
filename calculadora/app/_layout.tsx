// app/_layout.tsx
import React, { useState, useEffect } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import * as Font from "expo-font";
import { Stack } from "expo-router";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { HistoryProvider } from "@/contexts/HistoryContext";

export default function RootLayout() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        "source-code-pro": require("../assets/fonts/SourceCodePro-Regular.ttf"),
        "source-code-pro-bold": require("../assets/fonts/SourceCodePro-Bold.ttf"),
      });
      setFontsLoaded(true);
    }

    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return (
      <ThemeProvider>
        <ActivityIndicator size="large" color="#fff" />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <HistoryProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </HistoryProvider>
    </ThemeProvider>
  );
}
