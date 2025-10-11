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
import { useTheme } from "@/contexts/ThemeContext";
import { useHistory } from "@/contexts/HistoryContext";
import { HistoryModal } from "@/components/HistoryModal";

const { width } = Dimensions.get("window");
const scale = (size: number) => (width / 400) * size;

export default function Index() {
  const [display, setDisplay] = useState("0");
  const [isResult, setIsResult] = useState(false);
  const [scientific, setScientific] = useState(false);
  const { theme } = useTheme();
  const { history, addToHistory } = useHistory();
  const [historyVisible, setHistoryVisible] = useState(false);
  const lastHistory = [...history].slice(0, 10).reverse();

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
    if (result !== null) {
      addToHistory(display, result);
      setDisplay(result);
      setIsResult(true);
    }
  };

  const handleSignToggle = () => {
    setDisplay((prev) => handleToggleSign(prev));
  };

  return (
    <SafeAreaView style={[styles.root, { backgroundColor: theme.background }]}>
      <TopBar
        scientific={scientific}
        toggleScientific={() => setScientific(!scientific)}
        onShowHistory={() => setHistoryVisible(true)}
      />

      <View style={styles.container}>
        <LinearGradient
          colors={[theme.background, "rgba(0,0,0,0)"]}
          style={styles.topFade}
        />

        <View style={styles.historyContainer}>
          {lastHistory.map((item) => (
            <Text
              key={item.timestamp}
              style={[styles.historyText, { color: theme.historyText }]}
            >
              {item.expression}={item.result}
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

      <HistoryModal
        visible={historyVisible}
        onClose={() => setHistoryVisible(false)}
      />
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
