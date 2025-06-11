import { supabase } from "@/src/lib/supabase";
import * as FileSystem from "expo-file-system";

class ProfileService {

    async updateProfile(
        userId: string,
        data: { username?: string;
        full_name?: string;
        avatar_url?: string }
    ) {
    return await supabase
        .from("users")
        .update(data)
        .eq("id", userId);
    }

    async getProfile(userId: string) {
        const { data, error } = await supabase
            .from("users")
            .select("*")
            .eq("id", userId)
            .single();

        if (error) throw error;
        return data;
    }

    async uploadAvatar(userId: string, uri: string) {
        const ext = uri.split('.').pop();
        const filePath = `${userId}_${Date.now()}.${ext}`;

        // Lê o arquivo como array buffer
        const file = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });
        const buffer = Uint8Array.from(atob(file), c => c.charCodeAt(0));

        const { error } = await supabase
            .storage
            .from("avatars")
            .upload(filePath, buffer, {
                contentType: "image/jpeg",
                upsert: true,
            });

        if (error) throw error;

        const { data } = supabase
            .storage
            .from("avatars")
            .getPublicUrl(filePath);

        return data.publicUrl;
    }
}


export default new ProfileService();