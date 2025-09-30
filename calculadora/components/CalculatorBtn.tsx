import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  label?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
  flex?: number;
  color?: string;
  backgroundColor?: string;
};

export const CalculatorBtn: React.FC<Props> = ({
  label,
  icon,
  onPress,
  flex = 1,
  color= "#fff",
  backgroundColor = "#333",
}) => {
  return (
    <TouchableOpacity style={[styles.roundButton, { flex }, { backgroundColor }]} onPress={onPress}>
      {icon ? (
        <Ionicons name={icon} size={32} color={color}/>
      ) : (
        <Text style={[styles.label, { color }]}>{label}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  roundButton: {
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    aspectRatio: 1,
    borderRadius: 9999,
  },
  label: {
    fontSize: 28,
    fontWeight: "500",
  },
});
