// app/index.tsx
import React, { useState } from "react";
import { View, StyleSheet, Text, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Display } from "@/components/Display";
import { Keyboard } from "@/components/Keyboard";
import { LinearGradient } from "expo-linear-gradient";
import {
  handleNumber,
  handleOperator,
  handleDot,
  handleEqual,
  handleToggleSign,
} from "@/lib/calculator";
import { TopBar } from "@/components/TopBar";
import { useTheme } from "@/context/ThemeContext";

const { width } = Dimensions.get("window");
const scale = (size: number) => (width / 400) * size;

export default function Index() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [display, setDisplay] = useState("0");
  const [isResult, setIsResult] = useState(false);
  const [scientific, setScientific] = useState(false);

  const history = [
    "5 + 5 = 10",
    "10 × 2 = 20",
    "5 + 5 = 10",
    "10 × 2 = 20",
  ];

  const handlePress = (value: string) => {
    if (!isNaN(Number(value))) {
      const result = handleNumber(value, display, isResult);
      setDisplay(result.display);
      setIsResult(result.isResult);
      return;
    }

    if (value === ".") {
      const result = handleDot(display, isResult);
      setDisplay(result.display);
      setIsResult(result.isResult);
      return;
    }

    const result = handleOperator(value, display, isResult);
    setDisplay(result);
    setIsResult(false);
  };

  const handleDelete = () => setDisplay((prev) => prev.slice(0, -1) || "0");
  const handleClear = () => setDisplay("0");
  const handleEquals = () => {
    const result = handleEqual(display);
    if (result === null) return;
    setDisplay(result);
    setIsResult(true);
  };

  const handleMenuPress = () => {
    console.log("Abrir menú");
  };

  const handleSignToggle = () => {
    setDisplay((prev) => handleToggleSign(prev));
  };

  return (
    <SafeAreaView
      style={[
        styles.root,
        { backgroundColor: isDark ? "#000" : "#fff" },
      ]}
      edges={["bottom", "left", "right"]}
    >
      <TopBar
        scientific={scientific}
        toggleScientific={() => setScientific(!scientific)}
        onMenuPress={handleMenuPress}
      />
      <View style={styles.container}>
        <LinearGradient
          colors={isDark ? ["#000", "rgba(0,0,0,0)"] : ["#fff", "rgba(255,255,255,0)"]}
          style={styles.topFade}
        />
        <View style={styles.historyContainer}>
          {history.map((item, index) => (
            <Text
              key={index}
              style={[
                styles.historyText,
                { color: isDark ? "#999" : "#555" },
              ]}
              numberOfLines={1}
            >
              {item}
            </Text>
          ))}
        </View>

        <View style={styles.displayContainer}>
          <Display value={display} />
        </View>

        <View style={styles.keyboardContainer}>
          <Keyboard
            scientific={scientific}
            onPress={handlePress}
            onClear={handleClear}
            onDelete={handleDelete}
            onEquals={handleEquals}
            onToggleSign={handleSignToggle}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "flex-end",
    overflow: "hidden",
  },
  topFade: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 100,
    zIndex: 10,
  },
  historyContainer: {
    paddingHorizontal: 20,
    justifyContent: "flex-end",
    opacity: 0.7,
  },
  historyText: {
    fontSize: scale(20),
    textAlign: "right",
  },
  displayContainer: {
    justifyContent: "flex-end",
  },
  keyboardContainer: {
    flexDirection: "column",
    minHeight: "50%",
  },
});
