import { useColorScheme } from "react-native";
import { APP_BACKGROUND_DARK } from "../constants/color";

export function useColor() {
  const colorScheme = useColorScheme();

  return {
    background: colorScheme === "dark" ? APP_BACKGROUND_DARK : "white",
    color: colorScheme === "dark" ? "#F0F0F0" : "black",
  };
}
