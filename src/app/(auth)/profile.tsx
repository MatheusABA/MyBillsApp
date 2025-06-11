import colors from "@/src/constants/colors";
import { useAuth } from "@/src/contexts/AuthContext";
import profileService from "@/src/services/profile.service";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function ProfileScreen() {
  const { user, setUser } = useAuth();
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const [username, setUsername] = useState(user?.username || "");
  const [fullName, setFullName] = useState(user?.full_name || "");
  const [avatarUrl, setAvatarUrl] = useState(user?.avatar_url || "");

  async function handlePickAvatar() {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setLoading(true);
        try {
          const url = await profileService.uploadAvatar(user.id, result.assets[0].uri);
          setAvatarUrl(url);
        } catch (e) {
          console.log("Erro ao fazer upload do avatar:", e);''
          Alert.alert("Erro", "Não foi possível fazer upload do avatar.");
        }
        setLoading(false);
      }
    } catch (e) {
      Alert.alert("Erro", "Não foi possível acessar a galeria.");
    }
  }

  async function handleSave() {
    setLoading(true);
    try {
      const { error } = await profileService.updateProfile(user.id, {
        username,
        full_name: fullName,
        avatar_url: avatarUrl,
      });
      setLoading(false);

      if (error) {
        Alert.alert("Erro", "Não foi possível atualizar o perfil.");
      } else {
        setUser({ ...user, username, full_name: fullName, avatar_url: avatarUrl });
        setEditing(false);
        Alert.alert("Sucesso", "Perfil atualizado!");
      }
    } catch (err) {
      setLoading(false);
      Alert.alert("Erro", "Não foi possível atualizar o perfil.");
    }
  }

  async function fetchProfile() {
    try {
      setLoading(true);
      const data = await profileService.getProfile(user.id);
      setUsername(data?.username || "");
      setFullName(data?.full_name || "");
      setAvatarUrl(data?.avatar_url || "");
      setLoading(false);
    } catch (err) {
      setLoading(false);
      Alert.alert("Erro", "Não foi possível carregar o perfil.");
    }
  }


  useEffect(() => {
    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <TouchableOpacity onPress={editing ? handlePickAvatar : undefined} disabled={!editing}>
          {avatarUrl ? (
            <Image source={{ uri: avatarUrl }} style={styles.avatarImg} />
          ) : (
            <Ionicons name="person-circle" size={100} color={colors.primary} />
          )}
          {editing && (
            <View style={styles.cameraIcon}>
              <Ionicons name="camera" size={28} color={colors.primary} />
            </View>
          )}
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>Perfil</Text>
      <View style={styles.infoBox}>
        <Text style={styles.label}>Nome de usuário</Text>
        {editing ? (
          <TextInput
            style={styles.input}
            value={username}
            onChangeText={setUsername}
            placeholder="Nome de usuário"
          />
        ) : (
          <Text style={styles.value}>{username || "-"}</Text>
        )}

        <Text style={styles.label}>Nome completo</Text>
        {editing ? (
          <TextInput
            style={styles.input}
            value={fullName}
            onChangeText={setFullName}
            placeholder="Nome completo"
          />
        ) : (
          <Text style={styles.value}>{fullName || "-"}</Text>
        )}

        <Text style={styles.label}>Email</Text>
        <Text style={[styles.value, { fontSize: 16 }]}>{user?.email || "-"}</Text>
      </View>

      {editing ? (
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.saveButton} onPress={handleSave} disabled={loading}>
            {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.saveButtonText}>Salvar</Text>}
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={() => setEditing(false)} disabled={loading}>
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity style={styles.editButton} onPress={() => setEditing(true)}>
          <Ionicons name="create-outline" size={18} color="#fff" />
          <Text style={styles.editButtonText}>Editar perfil</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 24,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  avatarContainer: {
    marginTop: 40,
    marginBottom: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarImg: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#eee",
  },
  cameraIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 2,
  },
  title: {
    fontSize: 26,
    fontFamily: "SansBold",
    color: colors.primary,
    marginBottom: 18,
    textAlign: "center",
    letterSpacing: 1,
  },
  infoBox: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 24,
    width: "100%",
    maxWidth: 350,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    marginBottom: 24,
  },
  label: {
    fontSize: 15,
    fontFamily: "SansMedium",
    color: colors.primary,
    marginTop: 10,
    marginBottom: 2,
  },
  value: {
    fontSize: 17,
    fontFamily: "SansLight",
    color: colors.text,
    marginBottom: 8,
  },
  input: {
    fontSize: 17,
    fontFamily: "SansLight",
    color: colors.text,
    backgroundColor: "#f3f3f3",
    borderRadius: 6,
    padding: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#eee",
  },
  editButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 22,
    borderRadius: 8,
  },
  editButtonText: {
    color: "#fff",
    fontFamily: "SansBold",
    fontSize: 16,
    marginLeft: 8,
  },
  buttonRow: {
    flexDirection: "row",
    gap: 12,
  },
  saveButton: {
    backgroundColor: colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 22,
    borderRadius: 8,
    marginRight: 8,
  },
  saveButtonText: {
    color: "#fff",
    fontFamily: "SansBold",
    fontSize: 16,
  },
  cancelButton: {
    backgroundColor: "#eee",
    paddingVertical: 10,
    paddingHorizontal: 22,
    borderRadius: 8,
  },
  cancelButtonText: {
    color: colors.primary,
    fontFamily: "SansBold",
    fontSize: 16,
  },
});