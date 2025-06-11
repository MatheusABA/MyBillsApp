import { supabase } from "@/src/lib/supabase";

export async function updateProfile(
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