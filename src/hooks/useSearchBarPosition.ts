import { useEffect, useRef, useState } from "react";
import {
  Animated,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import { useDebouncedCallback } from "use-debounce";
import { useIsBottomSheetOpened } from "./useIsBottomSheetOpened";

const BOUND = 120;

export function useSearchBarPosition(scrollRef: ScrollView | null) {
  const { height: deviceHeight } = useWindowDimensions();

  const [isBottomSheetOpened] = useIsBottomSheetOpened();
  const [contentHeight, setContentHeight] = useState(0);
  const scrollYMax = isBottomSheetOpened
    ? 0
    : Math.max(contentHeight - deviceHeight, 1);

  const scrollY = useRef(new Animated.Value(0)).current;
  const scrollYValue = useRef(0);
  const translationOffset = useRef(new Animated.Value(0)).current;

  const clampedScrollViewY = scrollY.interpolate({
    inputRange: [0, scrollYMax],
    outputRange: [0, scrollYMax],
    extrapolate: "clamp",
  });

  const clampedScrollViewYDiff = Animated.diffClamp(
    clampedScrollViewY,
    -scrollYMax,
    scrollYMax
  ).interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });
  const clampedScrollViewYDiffValue = useRef(0);

  const translation = Animated.add(
    clampedScrollViewYDiff,
    translationOffset
  ).interpolate({
    inputRange: [0, BOUND],
    outputRange: [0, 160],
    extrapolate: "clamp",
  });
  const translationValue = useRef(0);

  const handleHeightChange = useDebouncedCallback((_, _height: number) => {
    scrollRef?.scrollTo({ y: 0 });
    setContentHeight(_height);
  });

  const handleHide = () => {
    if (translationValue.current > 50 && scrollYValue.current > 0) {
      Animated.timing(translationOffset, {
        toValue: BOUND - clampedScrollViewYDiffValue.current,
        useNativeDriver: true,
        duration: 300,
      }).start();
    } else {
      Animated.timing(translationOffset, {
        toValue: -clampedScrollViewYDiffValue.current,
        useNativeDriver: true,
        duration: 300,
      }).start();
    }
  };

  const handleDragEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (event.nativeEvent.velocity.y !== 0) {
      return;
    }
    handleHide();
  };

  const handleMomentumEnd = () => {
    handleHide();
  };

  useEffect(() => {
    const listenerId = clampedScrollViewYDiff.addListener(({ value }) => {
      clampedScrollViewYDiffValue.current = value;
    });

    return () => clampedScrollViewYDiff.removeListener(listenerId);
  }, [clampedScrollViewYDiff]);

  useEffect(() => {
    const listenerId = translation.addListener(({ value }) => {
      translationValue.current = value;
    });

    return () => translation.removeListener(listenerId);
  }, [translation]);

  useEffect(() => {
    const listenerId = scrollY.addListener(({ value }) => {
      scrollYValue.current = value;
    });

    return () => scrollY.removeListener(listenerId);
  }, [scrollY]);

  return {
    scrollY,
    translation,
    handleDragEnd,
    handleMomentumEnd,
    handleHeightChange,
  };
}
