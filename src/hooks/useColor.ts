import { APP_BACKGROUND_DARK } from "../constants/color";
import { useIsDarkmode } from "./useIsDarkmode";

export function useColor() {
  const isDarkmode = useIsDarkmode();

  return {
    background: isDarkmode ? APP_BACKGROUND_DARK : "#FFFFFF",
    transparent: !isDarkmode
      ? "rgba(0, 0, 0, 0.1)"
      : "rgba(255, 255, 255, 0.1)",
    color: isDarkmode ? "#F0F0F0" : "black",
  };
}
