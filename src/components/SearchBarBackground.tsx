import { useEffect, useMemo, useRef } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { SEARCHBAR_TRANSITION_DURATION } from "../constants/animated";
import { ZIndex } from "../constants/zIndex";
import { useColor } from "../hooks/useColor";
import { useIsBottomSheetOpened } from "../hooks/useIsBottomSheetOpened";
import { useNavigatorGesture } from "../hooks/useNavigatorGesture";
import { useHistory } from "../hooks/useHistory";
import { useNavigation } from "../hooks/useNavigation";
import { useNavigator } from "../hooks/useNavigator";

export function SearchBarBackground() {
  const { color } = useColor();
  const [history] = useHistory();
  const [navigator] = useNavigator();
  const { canGoBack, canGoForward } = useNavigation();

  const [isBottomSheetOpened, setIsBottomSheetOpened] =
    useIsBottomSheetOpened();
  const [navigatorGesture] = useNavigatorGesture();
  const shouldShowIndicator = useMemo(() => {
    if (navigatorGesture !== "none") {
      return true;
    }

    return false;
  }, [navigatorGesture]);

  const indicateText = (() => {
    switch (navigatorGesture) {
      case "back": {
        if (!canGoBack) {
          return [
            "처음이에요",
            <Entypo name="cross" size={60} color={color} />,
          ] as const;
        }

        return [
          history[navigator + 1],
          <AntDesign name="arrowleft" size={60} color={color} />,
        ] as const;
      }
      case "forward": {
        if (!canGoForward) {
          return [
            "최근이에요",
            <Entypo name="cross" size={60} color={color} />,
          ] as const;
        }

        return [
          history[navigator - 1],
          <AntDesign name="arrowright" size={60} color={color} />,
        ] as const;
      }
      case "setting":
        return [
          "설정",
          <AntDesign name="setting" size={60} color={color} />,
        ] as const;
      case "none":
      default:
        return ["", null];
    }
  })();

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
