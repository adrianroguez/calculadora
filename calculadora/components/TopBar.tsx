import React, { useState, useRef, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Pressable,
  Animated,
  Easing,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/contexts/ThemeContext";

type TopBarProps = {
  scientific: boolean;
  toggleScientific: () => void;
  onShowHistory: () => void;
};

export const TopBar: React.FC<TopBarProps> = ({
  scientific,
  toggleScientific,
  onShowHistory,
}) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const { theme, toggleTheme, themeType } = useTheme();

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(-10)).current;

  const rotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (menuVisible) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
          easing: Easing.out(Easing.ease),
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
          easing: Easing.out(Easing.ease),
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: -10,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [menuVisible]);

  const handleMenuToggle = () => setMenuVisible((prev) => !prev);

  const animateIcon = () => {
    Animated.timing(rotation, {
      toValue: 1,
      duration: 700,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start(() => {
      rotation.setValue(0);
    });
  };

  const handleToggleTheme = () => {
    animateIcon();
    setTimeout(toggleTheme, 50);
  };

  const rotateInterpolate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.leftSide}>
        <TouchableOpacity
          style={[
            styles.leftButton,
            { backgroundColor: theme.equalsBtnBackground },
          ]}
          onPress={toggleScientific}
        >
          <Text style={[styles.buttonText, { color: "#fff" }]}>
            {scientific ? "Científica" : "Básica"}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.center}>
        <TouchableOpacity onPress={handleToggleTheme} activeOpacity={0.7}>
          <Animated.View
            style={{
              transform: [{ rotate: rotateInterpolate }],
            }}
          >
            <Ionicons
              name={themeType === "dark" ? "sunny" : "moon"}
              size={28}
              color={theme.text}
            />
          </Animated.View>
        </TouchableOpacity>
      </View>

      <View style={styles.rightSide}>
        <TouchableOpacity onPress={handleMenuToggle}>
          <Ionicons name="ellipsis-vertical" size={24} color={theme.text} />
        </TouchableOpacity>

        {menuVisible && (
          <Animated.View
            style={[
              styles.dropdown,
              {
                backgroundColor: theme.buttonBackground,
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <Pressable
              onPress={() => {
                setMenuVisible(false);
                onShowHistory();
              }}
            >
              <Text style={[styles.option, { color: theme.text }]}>
                Ver historial
              </Text>
            </Pressable>
          </Animated.View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  leftSide: { flex: 1, alignItems: "flex-start" },
  rightSide: { flex: 1, alignItems: "flex-end" },
  center: { flex: 1, alignItems: "center" },
  leftButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  dropdown: {
    position: "absolute",
    top: 50,
    right: 0,
    borderRadius: 12,
    paddingVertical: 6,
    paddingLeft: 10,
    width: 160,
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
