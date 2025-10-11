import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

type IconLibrary = "ionicons" | "material";

type Props = {
  label?: string;
  icon?: string;
  iconLib?: IconLibrary;
  onPress: () => void;
  flex?: number;
  color?: string;
  backgroundColor?: string;
  scale?: number;
  gradientColors?: readonly [string, string, ...string[]];
};

export const CalculatorBtn: React.FC<Props> = ({
  label,
  icon,
  iconLib = "ionicons",
  onPress,
  flex = 1,
  color = "#fff",
  backgroundColor = "#333",
  scale = 1,
  gradientColors,
}) => {
  const Content = (
    <>
      {icon ? (
        iconLib === "material" ? (
          <MaterialCommunityIcons
            name={icon as keyof typeof MaterialCommunityIcons.glyphMap}
            size={32 * scale}
            color={color}
          />
        ) : (
          <Ionicons
            name={icon as keyof typeof Ionicons.glyphMap}
            size={32 * scale}
            color={color}
          />
        )
      ) : (
        <Text
          style={[
            styles.label,
            { color, fontSize: 28 * scale, fontFamily: "source-code-pro" },
          ]}
        >
          {label}
        </Text>
      )}
    </>
  );

  return (
    <TouchableOpacity style={[{ flex }]} onPress={onPress} activeOpacity={0.8}>
      {gradientColors ? (
        <LinearGradient
          colors={gradientColors}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={[styles.button]}
        >
          {Content}
        </LinearGradient>
      ) : (
        <View style={[styles.button, { backgroundColor }]}>
          {Content}
        </View>
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
