import { useColorScheme } from "react-native";

export function useIsDarkmode() {
  return useColorScheme() === "dark";
}
