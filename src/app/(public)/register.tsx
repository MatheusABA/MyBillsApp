import React, { useState } from "react";
import { View, TextInput, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useAuth } from "../../contexts/AuthContext";
import { useRouter } from "expo-router";
import colors from "@/src/constants/colors";

const registerLogo = require("@/assets/register/Wavy_Tech-31_Single-01.jpg");

export default function RegisterScreen() {
  const { signUp, loading } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

    const handleRegister = async () => {
        setError("");
        setSuccess("");
        try {
            await signUp(email, password);
            setSuccess("Cadastro realizado! Verifique seu e-mail.");
            setTimeout(() => router.replace("/login"), 1500);
        } catch (err: any) {

            setError(err.message || "Erro ao criar a conta.");
        }
    };

  return (
    <View style={styles.container}>
        <Image source={registerLogo} style={styles.logo} resizeMode="contain"/>
      <Text style={styles.title}>Crie sua conta</Text>
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      {success ? <Text style={styles.success}>{success}</Text> : null}
      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleRegister}
        disabled={loading}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>
          {loading ? "Criando conta..." : "Cadastrar"}
        </Text>
      </TouchableOpacity>
      <Text style={styles.link} onPress={() => router.replace("/login")}>
        Já possui uma conta? Faça login
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 24,
    },
    logo: {
        width: 200,
        height: 200,
        marginBottom: 24,
        alignSelf: "center",
    },
    title: {
        fontSize: 24,
        fontFamily: "SansBold",
        marginBottom: 24,
        textAlign: "center",
    },
    input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontFamily: "SansLight",
    },
    error: {
    color: colors.error,
    marginBottom: 12,
    textAlign: "center",
    },
    success: {
    color: colors.success,
    marginBottom: 12,
    textAlign: "center",
    },
    button: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    },
    buttonDisabled: {
    backgroundColor: "#aaa",
    },
    buttonText: {
    color: "#fff",
    fontFamily: "SansMedium",
    fontSize: 16,
    },
    link: {
    color: colors.primary,
    marginTop: 16,
    textAlign: "center",
    fontFamily: "SansLight",
    },
});