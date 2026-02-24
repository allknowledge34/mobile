import { Stack, Redirect } from "expo-router";
import { useAuthStore } from "../../store/authStore";

export default function AuthLayout() {
  const { user, token, loading } = useAuthStore();

  if (loading) {
    return null;
  }


  if (user && token) {
    return <Redirect href="/(tabs)" />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
