import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

type IconLibrary = "ionicons" | "material";

type Props = {
  label?: string;
  icon?: string;
  iconLib?: IconLibrary; // nueva prop
  onPress: () => void;
  flex?: number;
  color?: string;
  backgroundColor?: string;
  scale?: number;
};

export const CalculatorBtn: React.FC<Props> = ({
  label,
  icon,
  iconLib = "ionicons",
  onPress,
  flex = 1,
  color= "#fff",
  backgroundColor = "#333",
  scale = 1,
}) => {
  return (
    <TouchableOpacity style={[styles.button, { flex }, { backgroundColor }]} onPress={onPress}>
      {icon ? (
        iconLib === "material" ? (
          <MaterialCommunityIcons name={icon as keyof typeof MaterialCommunityIcons.glyphMap} size={32 * scale} color={color} />
        ) : (
          <Ionicons name={icon as keyof typeof Ionicons.glyphMap} size={32 * scale} color={color} />
        )
      ) : (
        <Text style={[styles.label, { color, fontSize: 28 * scale, fontFamily: "source-code-pro" }]}>{label}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    aspectRatio: 1,
    borderRadius: 15,
  },
  label: {
    fontSize: 28,
    fontWeight: "500",
  },
});