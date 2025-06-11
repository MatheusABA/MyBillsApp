import colors from "@/src/constants/colors";
import { useAuth } from "@/src/contexts/AuthContext";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  const { user } = useAuth();

  return (
    <View style={styles.container}>
        <Text style={styles.title}>Bem-vindo ao MyBillsApp!</Text>
        <Text style={styles.subtitle}>Você está logado 🎉</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontFamily: "SansBold",
    color: colors.primary,
    marginBottom: 12,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    fontFamily: "SansLight",
    color: colors.text,
    textAlign: "center",
  },
});