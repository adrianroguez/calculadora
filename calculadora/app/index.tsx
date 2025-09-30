import { View, StyleSheet } from "react-native";
import { Display } from "@/components/Display";
import { Keyboard } from "@/components/Keyboard";
import { useState } from "react";

export default function Index() {
  const [display, setDisplay] = useState("0");

  const handlePress = (value: string) => {
    console.log("Pressed:", value);
    setDisplay((prev) => (prev === "0" ? value : prev + value));
  };

  return (
    <View style={styles.container}>
      <Display value={display} />
      <Keyboard onPress={handlePress} onClear={() => setDisplay("0")} />
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