import { useAuth } from "@/src/contexts/AuthContext";
import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";

export default function PublicLayout() {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if(user) {
            // Se autenticado, redireciona para a home
            router.replace("/(auth)/home");
        }
    }, [user, router])

    return (
        <Stack
            screenOptions={{
                headerShown: false,
            }}
        />
    );
}