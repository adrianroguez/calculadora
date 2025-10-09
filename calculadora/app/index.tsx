import { View, StyleSheet } from "react-native";
import { Display } from "@/components/Display";
import { Keyboard } from "@/components/Keyboard";
import React, { useState } from "react";
import { evaluate } from "mathjs";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const [display, setDisplay] = useState("0");
  const [isResult, setIsResult] = useState(false);

  const handlePress = (value: string) => {
    console.log(value);
    let input = parseFloat(value);
    if (!isNaN(input)) {
      if (isResult) {
        setDisplay(String(input));
        setIsResult(false);
      } else {
        setDisplay((prev) => prev === "0" ? String(input) : prev + String(input));
      }
    }

    if (value==="." && !display.includes(".")) setDisplay((prev) => prev === "0" ? value : prev + value);

    if (/[\+\-\÷\×\%]/.test(value) || /[\log\\sin\pi\cos\\tan\)\(\^\e]/.test(value)) {
      setIsResult(false);
      setDisplay((prev) => prev === "0" ? value : prev + value);
    }
  };

  const handleDelete = () => {
    console.log("Delete pressed");
    setDisplay((prev) => prev.slice(0, -1) || "0");
  };

  const handleClear = () => {
    console.log("Clear pressed");
    setDisplay("0");
  };

  const handleEqual = () => {
    console.log("Equal pressed");
    try {
      if (display === "0") return;
      if (/[\+\-\÷\×]$/.test(display)) return;

      const expression = display.replace(/×/g, "*").replace(/÷/g, "/");
      const result = evaluate(expression);
      setDisplay(result.toString());
      setIsResult(true);
    } catch (error) {
      console.log("Error");
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <Display value={display} />
        <Keyboard onPress={handlePress} onClear={handleClear} onDelete={handleDelete} onEquals={handleEqual} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "flex-end",
  },
});