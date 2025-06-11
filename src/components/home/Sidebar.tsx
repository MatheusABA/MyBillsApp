import { useAuth } from "@/src/contexts/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";



interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const { user } = useAuth();

    if (!isOpen) return null;

  

    return (
      <View style={[styles.overlay]}>
        <TouchableOpacity style={styles.overlayTouchable} onPress={onClose} />
        <View style={styles.sidebar}>

          <View style={styles.iconRow}>
            <TouchableOpacity
              style={styles.profileButton}
              onPress={() => {
                onClose();
                router.push("/(auth)/profile");
              }}
            >
              {user?.avatar_url ? (
                <Image
                  source={{ uri: user.avatar_url }}
                  style={{ width: 50, height: 50, borderRadius: 25, backgroundColor: "#eee" }}
                />
              ) : (
                <Ionicons name="person-circle" size={50} color="#222" />
              )}
            </TouchableOpacity>

            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Ionicons name="arrow-back-circle" size={35} color="#222" />
            </TouchableOpacity>
          </View>

          {/* Título */}
          <Text style={styles.title}>Menu</Text>

          {/* Tela Inicial */}
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              onClose();
              router.push("/(auth)/home");
            }}
          >
            <Text style={styles.menuText}>Início</Text>
          </TouchableOpacity>




        </View>
      </View>
    );
};

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    flexDirection: "row",
    zIndex: 100,
    justifyContent: "flex-start",
  },
  overlayTouchable: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  sidebar: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: '50%',
    backgroundColor: "#fff",
    paddingTop: 40,
    paddingHorizontal: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  closeButton: {
    alignSelf: "center",
  },
  title: {
    fontSize: 22,
    fontFamily: "SansMedium",
  },
  menuItem: {
    paddingVertical: 16,
    paddingLeft: 4,
  },
  menuText: {
    fontSize: 18,
    fontFamily: "SansLight",
  },
  iconRow: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  profileButton: {
    marginRight: 10,
  },
});