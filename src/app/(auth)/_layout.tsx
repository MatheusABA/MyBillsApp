import { HeaderMenu } from "@/src/components/home/HeaderMenu";
import { Sidebar } from "@/src/components/home/Sidebar";
import { Stack } from "expo-router";
import React, { useState } from "react";
import { View } from "react-native";

export default function AuthLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} /> 
      <View style={{ flex: 1 }}>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        />
        {!sidebarOpen && (
          <HeaderMenu onPress={() => setSidebarOpen(true)} />
        )}
      </View>
    </View>
  );
}