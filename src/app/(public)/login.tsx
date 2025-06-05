import colors from "@/src/constants/colors";
import { useAuth } from "@/src/contexts/AuthContext";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

const loginLogo = require("@/assets/login/f448a2a2-1310-4403-95fc-7ab70dd4a843.jpg")

export default function LoginScreen() {
    const { signIn, loading } = useAuth();
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async () => {
        setError("");
        try {
            await signIn(email, password);
        } catch (err: any) {
            setTimeout(() => {
                setError("Ops. Não foi possível fazer login. Tente novamente.");
            }, 500)
        }
    }

    return (
        <View style={styles.container}>
            <Image source={loginLogo} style={styles.logo} resizeMode="contain"/>
            <Text style={styles.title}>Acesse sua conta</Text>
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
            <TouchableOpacity
                style={[styles.button, loading && styles.buttonDisabled]}
                onPress={handleLogin}
                disabled={loading}
                activeOpacity={0.8}
                >
                <Text style={styles.buttonText}>
                    {loading ? "Entrando..." : "Entrar"}
                </Text>
            </TouchableOpacity>
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <Text style={styles.link} onPress={() => router.push("/(public)/register")}>
                Não tem conta? Cadastre-se
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
        textAlign: "center"
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 12,
        marginBottom: 12,
        fontFamily: 'SansLight',
    },
    error: {
        color: "red",
        marginBottom: 12,
        textAlign: "center",
        fontFamily: "SansLight",
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