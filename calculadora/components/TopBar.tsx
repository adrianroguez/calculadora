// components/TopBar.tsx
import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/context/ThemeContext";

type TopBarProps = {
  scientific: boolean;
  toggleScientific: () => void;
  onMenuPress: () => void;
};

export const TopBar: React.FC<TopBarProps> = ({
  scientific,
  toggleScientific,
  onMenuPress,
}) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <View style={[styles.container, { backgroundColor: isDark ? "#000" : "#fff" }]}>
      <TouchableOpacity style={styles.leftButton} onPress={toggleScientific}>
        <Text style={[styles.buttonText, { color: isDark ? "#fff" : "#000" }]}>
          {scientific ? "Científica" : "Básica"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setMenuVisible(!menuVisible)}>
        <Ionicons name="ellipsis-vertical" size={24} color={isDark ? "#fff" : "#000"} />
      </TouchableOpacity>

      {menuVisible && (
        <View
          style={[
            styles.dropdown,
            { backgroundColor: isDark ? "#222" : "#eee" },
          ]}
        >
          <Pressable onPress={() => console.log("Historial")}>
            <Text style={[styles.option, { color: isDark ? "#fff" : "#000" }]}>
              Ver historial
            </Text>
          </Pressable>
          <Pressable onPress={toggleTheme}>
            <Text style={[styles.option, { color: isDark ? "#fff" : "#000" }]}>
              Cambiar a {isDark ? "modo claro" : "modo oscuro"}
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  leftButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: "#444",
    borderRadius: 12,
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  dropdown: {
    position: "absolute",
    top: 50,
    right: 10,
    borderRadius: 12,
    paddingVertical: 8,
    width: 180,
    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 8,
    zIndex: 1000,
  },
  option: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 16,
  },
});
