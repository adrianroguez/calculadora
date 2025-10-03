import { View, StyleSheet } from "react-native";
import { Display } from "@/components/Display";
import { Keyboard } from "@/components/Keyboard";
import { useState } from "react";

export default function Index() {
  const [display, setDisplay] = useState("0");

  const handlePress = (value: string) => {
    if (value === "=") {
      display.match(/\d[\+\-\÷\×]\d/g) ? calc() : setDisplay(display);
    }
    setDisplay((prev) => (prev === "0" ? value : prev + value));
  };

  const handleDelete = () => {
    console.log("Delete pressed");
    setDisplay((prev) => prev.slice(0, -1) || "0");
  };

  const handleClear = () => {
    console.log("Clear pressed");
    setDisplay("0");
  };

  const calc = () => {
    const numbers = display.split(/([\+\-\÷\×])/g);
  };

  return (
    <View style={styles.container}>
      <Display value={display} />
      <Keyboard onPress={handlePress} onClear={handleClear} onDelete={handleDelete} />
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