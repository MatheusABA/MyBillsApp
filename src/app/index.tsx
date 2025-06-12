import { useRouter } from "expo-router";
import { useEffect } from "react";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    // Redireciona para a página de login
    router.replace("/(public)/login");
  }, [router]);

  return null;
}