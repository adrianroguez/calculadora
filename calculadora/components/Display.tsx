import React from "react";
import { View, Text, StyleSheet } from "react-native";

type Props = {
  value: string;
};

export const Display: React.FC<Props> = ({ value }) => {
  return (
    <View style={styles.container}>
      <Text
        style={styles.text}
        numberOfLines={1}
        adjustsFontSizeToFit
        minimumFontScale={0.4}
      >
        {value}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 120,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  text: {
    color: "#fff",
    fontSize: 40,
    fontWeight: "500",
    textAlign: "right",
  },
});
