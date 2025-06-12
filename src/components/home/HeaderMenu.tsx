import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity } from "react-native";

export function HeaderMenu({
  text,
  onPress
}: {
  text?: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.headerMenu}>
      <Ionicons name="menu" size={28} color="#222" />
    </TouchableOpacity>
  );
}


const styles = StyleSheet.create({
    headerMenu: {
        padding: 0,
        position: "absolute",
        top: 60,
        left: 20,
        zIndex: 100,
    },
})