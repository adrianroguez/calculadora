import React from "react";
import { View, Text, StyleSheet } from "react-native";

type Props = {
  value: string;
};

export const Display: React.FC<Props> = ({ value }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 120,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    padding: 20,
  },
  text: {
    color: "#fff",
    fontSize: 50,
    fontWeight: "500",
  },
});
