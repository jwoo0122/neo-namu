import { useColorScheme } from "react-native";
import { APP_BACKGROUND_DARK } from "../constants/color";

export function useColor() {
  const colorScheme = useColorScheme();

  return {
    background: colorScheme === "dark" ? APP_BACKGROUND_DARK : "#FFFFFF",
    transparent:
      colorScheme !== "dark"
        ? "rgba(0, 0, 0, 0.1)"
        : "rgba(255, 255, 255, 0.1)",
    color: colorScheme === "dark" ? "#F0F0F0" : "black",
  };
}
