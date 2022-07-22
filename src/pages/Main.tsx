import {
  View,
  ScrollView,
  Animated,
  KeyboardAvoidingView,
  useWindowDimensions,
  useColorScheme,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { NamuWiki } from "../components/NamuWiki";
import Result from "../components/Result";
import { SearchBar } from "../components/SearchBar";
import { useEffect, useRef, useState } from "react";
import { useIsLoading } from "../hooks/useSearch";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useColor } from "../hooks/useColor";

export default function Main() {
  const scrollRef = useRef<ScrollView | null>(null);
  const isLoading = useIsLoading();
  const { bottom: safeAreaBottom, top: safeAreaHeight } = useSafeAreaInsets();
  const { height: deviceHeight } = useWindowDimensions();
  const { background } = useColor();
  const colorScheme = useColorScheme();
  const transparentColor =
    colorScheme !== "dark" ? "rgba(0, 0, 0, 0.1)" : "rgba(255, 255, 255, 0.1)";

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

  useEffect(() => {
    if (!isLoading) {
      scrollRef.current?.scrollTo({ x: 0 });
    }
  }, [isLoading]);

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
          borderBottomColor: transparentColor,
        }}
      />
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
          <SearchBar />
        </Animated.View>
      </KeyboardAvoidingView>

      <Animated.ScrollView
        style={{ minHeight: "100%" }}
        ref={scrollRef}
        scrollEventThrottle={16}
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
        onContentSizeChange={(_, _height) => {
          setContentHeight(_height);
        }}
      >
        <Result />
        <NamuWiki />
      </Animated.ScrollView>
    </View>
  );
}
