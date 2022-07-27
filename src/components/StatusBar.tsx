import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ZIndex } from "../constants/zIndex";
import { useColor } from "../hooks/useColor";

export function StatusBar() {
  const { top: safeAreaHeight } = useSafeAreaInsets();
  const { background, transparent } = useColor();

  return (
    <>
      <ExpoStatusBar style={"auto"} animated={true} translucent={true} />
      <View
        style={[
          styles.statusBar,
          {
            backgroundColor: background,
            height: safeAreaHeight,
            borderBottomColor: transparent,
          },
        ]}
      />
    </>
  );
}

const styles = StyleSheet.create({
  statusBar: {
    zIndex: ZIndex.STATUS_BACKGROUND,
    position: "absolute",
    top: 0,
    width: "100%",
    borderBottomWidth: 1,
  },
});
