import { useEffect, useRef } from "react";
import { Animated, TouchableWithoutFeedback } from "react-native";
import { ZIndex } from "../constants/zIndex";
import { useIsBottomSheetOpened } from "../hooks/useIsBottomSheetOpened";

export function SearchBarBackground() {
  const [isBottomSheetOpened, setIsBottomSheetOpened] =
    useIsBottomSheetOpened();

  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: isBottomSheetOpened ? 0.5 : 0,
      useNativeDriver: true,
    }).start();
  }, [isBottomSheetOpened]);

  return (
    <TouchableWithoutFeedback onPress={() => setIsBottomSheetOpened(false)}>
      <Animated.View
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          backgroundColor: "rgb(0, 0, 0)",
          opacity,
          zIndex: ZIndex.SEARCHBAR_BACKGROUND,
        }}
        pointerEvents={isBottomSheetOpened ? "box-only" : "none"}
      />
    </TouchableWithoutFeedback>
  );
}
