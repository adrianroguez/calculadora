import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

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

  const handleMenuToggle = () => setMenuVisible(!menuVisible);
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.leftButton} onPress={toggleScientific}>
        <Text style={styles.buttonText}>
          {scientific ? "Científica" : "Básica"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleMenuToggle}>
        <Ionicons name="ellipsis-vertical" size={24} color="#fff" />
      </TouchableOpacity>

      {menuVisible && (
        <View style={styles.dropdown}>
          <Pressable onPress={() => console.log("Historial")}>
            <Text style={styles.option}>Ver historial</Text>
          </Pressable>
          <Pressable onPress={() => console.log("Tema oscuro")}>
            <Text style={styles.option}>Cambiar tema</Text>
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
  rightButton: {},
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  dropdown: {
    position: "absolute",
    top: 50,
    right: 10,
    backgroundColor: "#222",
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
    color: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 16,
  },
});
