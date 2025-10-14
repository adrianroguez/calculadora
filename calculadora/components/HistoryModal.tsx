import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  Modal,
  Animated,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  FlatList,
  Easing,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "@/contexts/ThemeContext";
import { useHistory } from "@/contexts/HistoryContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const { height, width } = Dimensions.get("window");

type HistoryModalProps = {
  visible: boolean;
  onClose: () => void;
};

export const HistoryModal: React.FC<HistoryModalProps> = ({
  visible,
  onClose,
}) => {
  const { history, clearHistory } = useHistory();
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();

  const slideAnim = useRef(new Animated.Value(height)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      slideAnim.setValue(height);
      opacityAnim.setValue(0);

      Animated.parallel([
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
          easing: Easing.out(Easing.quad),
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
          easing: Easing.out(Easing.quad),
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
          easing: Easing.in(Easing.quad),
        }),
        Animated.timing(slideAnim, {
          toValue: height,
          duration: 250,
          useNativeDriver: true,
          easing: Easing.in(Easing.quad),
        }),
      ]).start();
    }
  }, [visible]);

  return (
    <Modal visible={visible} transparent animationType="none">
      <Animated.View
        style={[
          styles.modal,
          {
            backgroundColor: theme.background,
            transform: [{ translateY: slideAnim }],
            paddingTop: insets.top + 10,
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
          },
        ]}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.iconButton}>
            <MaterialCommunityIcons name="close" size={26} color={theme.text} />
          </TouchableOpacity>

          <Text style={[styles.title, { color: theme.text }]}>Historial</Text>

          <TouchableOpacity onPress={clearHistory} style={styles.iconButton}>
            <MaterialCommunityIcons
              name="trash-can"
              size={22}
              color="#FF0000"
            />
          </TouchableOpacity>
        </View>

        <FlatList
          data={history}
          keyExtractor={(item) => item.timestamp.toString()}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item }) => (
            <Text
              style={[styles.historyText, { color: theme.historyText }]}
              numberOfLines={1}
            >
              {item.expression}={item.result}
            </Text>
          )}
          ListEmptyComponent={
            <Text style={[styles.emptyText, { color: theme.historyText }]}>
              Sin operaciones
            </Text>
          }
        />
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
  },
  iconButton: {
    padding: 5,
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  historyText: {
    textAlign: "right",
    fontSize: 18,
    paddingVertical: 8,
  },
  emptyText: {
    textAlign: "center",
    fontSize: 16,
    opacity: 0.6,
    marginTop: 20,
  },
});
