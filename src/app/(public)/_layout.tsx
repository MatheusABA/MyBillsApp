import { useAuth } from "@/src/contexts/AuthContext";
import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";
import LoginScreen from "./login";

export default function PublicLayout() {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if(user) {
            router.replace("/home");
        }
    }, [user])

    return (
        <Stack
        screenOptions={{
            headerShown: false,
        }}
        />
    );
}