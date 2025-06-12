import { useFonts } from "expo-font";
import { Stack, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import colors from "../constants/colors";
import { AuthProvider, useAuth } from "../contexts/AuthContext";


function AuthGate({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [showSplash, setShowSplash] = useState(true);
  const [fontsLoaded] = useFonts({
    'SpaceMono': require('../../assets/fonts/SpaceMono-Regular.ttf'),
    'SansBlack': require('../../assets/fonts/MADE-Outer-Sans-Black.otf'),
    'SansBold': require('../../assets/fonts/MADE-Outer-Sans-Bold.otf'),
    'SansLight': require('../../assets/fonts/MADE-Outer-Sans-Light.otf'),
    'SansMedium': require('../../assets/fonts/MADE-Outer-Sans-Medium.otf'),
  });

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 1);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/(public)/login");
    }
  }, [user, loading, showSplash, router]);

  if (loading || showSplash || !fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    )
  }

  return children;
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <AuthGate>
        <Stack 
          screenOptions={{
            headerShown: false,
          }}
        />
      </AuthGate>
    </AuthProvider>
  )
}
