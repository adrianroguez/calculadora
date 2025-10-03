import { View, StyleSheet } from "react-native";
import { Display } from "@/components/Display";
import { Keyboard } from "@/components/Keyboard";
import { useState } from "react";
import { evaluate } from "mathjs";

export default function Index() {
  const [display, setDisplay] = useState("0");

  const handlePress = (value: string) => {
    if (display === "0" && /[0-9]/.test(value)) {
      setDisplay(value);
    } else if (display === "0" && /[\+\-\÷\×]/.test(value)) {
      return;
    } else {
      setDisplay((prev) => prev + value);
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
    } catch (error) {
      console.log("Error");
    }
  };

  return (
    <View style={styles.container}>
      <Display value={display} />
      <Keyboard onPress={handlePress} onClear={handleClear} onDelete={handleDelete} onEquals={handleEqual} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "flex-end",
  },
});