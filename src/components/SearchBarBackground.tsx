import { useEffect, useMemo, useRef } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { SEARCHBAR_TRANSITION_DURATION } from "../constants/animated";
import { ZIndex } from "../constants/zIndex";
import { useColor } from "../hooks/useColor";
import { useIsBottomSheetOpened } from "../hooks/useIsBottomSheetOpened";
import { useNavigatorGesture } from "../hooks/useNavigatorGesture";

export function SearchBarBackground() {
  const { color } = useColor();

  const [isBottomSheetOpened, setIsBottomSheetOpened] =
    useIsBottomSheetOpened();
  const [navigatorGesture] = useNavigatorGesture();
  const shouldShowIndicator = useMemo(() => {
    if (navigatorGesture !== "none") {
      return true;
    }

    return false;
  }, [navigatorGesture]);

  const indicateText = useMemo(() => {
    switch (navigatorGesture) {
      case "back":
        return [
          "뒤로",
          <AntDesign name="arrowleft" size={60} color={color} />,
        ] as const;
      case "forward":
        return [
          "앞으로",
          <AntDesign name="arrowright" size={60} color={color} />,
        ] as const;
      case "setting":
        return [
          "설정",
          <AntDesign name="setting" size={60} color={color} />,
        ] as const;
      case "none":
      default:
        return ["", null];
    }
  }, [navigatorGesture, color]);

  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: isBottomSheetOpened || shouldShowIndicator ? 0.5 : 0,
      useNativeDriver: true,
      duration: SEARCHBAR_TRANSITION_DURATION,
    }).start();
  }, [isBottomSheetOpened, shouldShowIndicator]);

  return (
    <TouchableWithoutFeedback onPress={() => setIsBottomSheetOpened(false)}>
      <Animated.View
        style={[
          styles.wrapper,
          {
            opacity,
          },
        ]}
        pointerEvents={isBottomSheetOpened ? "box-only" : "none"}
      >
        <View style={{ marginBottom: 10 }}>{indicateText[1]}</View>
        <Text style={{ fontSize: 50, color }}>{indicateText[0]}</Text>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "rgb(0, 0, 0)",
    zIndex: ZIndex.SEARCHBAR_BACKGROUND,
  },
});
