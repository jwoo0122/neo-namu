import {
  View,
  ScrollView,
  Animated,
  KeyboardAvoidingView,
  useWindowDimensions,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { NamuWiki } from "../components/NamuWiki";
import Result from "../components/Result";
import SearchBar, { SearchBarHandler } from "../components/SearchBar";
import React, { useRef, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useColor } from "../hooks/useColor";
import { useDebouncedCallback } from "use-debounce";

function Main() {
  const searchBarRef = useRef<SearchBarHandler | null>(null);

  const scrollRef = useRef<ScrollView | null>(null);
  const { bottom: safeAreaBottom, top: safeAreaHeight } = useSafeAreaInsets();
  const { height: deviceHeight } = useWindowDimensions();
  const { background, transparent } = useColor();

  const [contentHeight, setContentHeight] = useState(0);
  const scrollYMax = Math.max(contentHeight - deviceHeight, 1);

  const scrolling = useRef(new Animated.Value(0)).current;

  const clampedScrollY = scrolling.interpolate({
    inputRange: [0, scrollYMax],
    outputRange: [0, scrollYMax],
    extrapolate: "clamp",
  });

  const scrollingClamped = Animated.diffClamp(clampedScrollY, 0, 400);

  const translation = scrollingClamped.interpolate({
    inputRange: [0, 400],
    outputRange: [0, 100],
    extrapolate: "clamp",
  });

  const handleHeightChange = useDebouncedCallback((_, _height: number) => {
    scrollRef.current.scrollTo({ y: 0 });
    setContentHeight(_height);
  });

  return (
    <View style={{ backgroundColor: background }}>
      <StatusBar style={"auto"} animated={true} translucent={true} />
      <View
        style={{
          backgroundColor: background,
          zIndex: 10,
          position: "absolute",
          top: 0,
          width: "100%",
          height: safeAreaHeight,
          borderBottomWidth: 1,
          borderBottomColor: transparent,
        }}
      />

      <View
        style={{ width: "100%", height: 0, position: "absolute", zIndex: 10 }}
      >
        <NamuWiki />
      </View>

      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={10}
        style={{
          position: "absolute",
          bottom: 0,
          zIndex: 1,
          width: "100%",
          marginBottom: safeAreaBottom,
        }}
      >
        <Animated.View
          style={{
            width: "100%",
            transform: [
              {
                translateY: translation,
              },
            ],
          }}
        >
          <SearchBar ref={searchBarRef} />
        </Animated.View>
      </KeyboardAvoidingView>

      <Animated.ScrollView
        style={{ minHeight: "100%" }}
        ref={scrollRef}
        scrollEventThrottle={16}
        onScrollBeginDrag={() => searchBarRef.current?.blur()}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  y: scrolling,
                },
              },
            },
          ],
          { useNativeDriver: true }
        )}
        onContentSizeChange={handleHeightChange}
      >
        <Result />
      </Animated.ScrollView>
    </View>
  );
}

export default React.memo(Main);
