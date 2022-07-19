import {
  View,
  ScrollView,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Text,
  Animated,
  KeyboardAvoidingView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { NamuWiki } from "../components/NamuWiki";
import { Result } from "../components/Result";
import { SearchBar } from "../components/SearchBar";
import { useEffect, useRef, useState } from "react";
import { useIsLoading } from "../hooks/useSearch";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Main() {
  const scrollRef = useRef<ScrollView | null>(null);
  const isLoading = useIsLoading();
  const { bottom } = useSafeAreaInsets();

  const scrolling = useRef(new Animated.Value(0)).current;
  const scrollingClamped = Animated.diffClamp(scrolling, 0, 400);

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
    <View>
      <StatusBar
        style={"auto"}
        animated={true}
        hideTransitionAnimation="slide"
        translucent={true}
      />
      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={10}
        style={{
          position: "absolute",
          bottom: 0,
          zIndex: 1,
          width: "100%",
          marginBottom: bottom,
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
      >
        <Result />
        <NamuWiki />
      </Animated.ScrollView>
    </View>
  );
}
