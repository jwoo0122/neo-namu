import { View, ScrollView, Animated, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { NamuWiki } from "../components/NamuWiki";
import Result from "../components/Result";
import SearchBar, { SearchBarHandler } from "../components/SearchBar";
import React, { useRef } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useColor } from "../hooks/useColor";
import { useSearchBarPosition } from "../hooks/useSearchBarPosition";

function Main() {
  const searchBarRef = useRef<SearchBarHandler | null>(null);

  const scrollRef = useRef<ScrollView | null>(null);
  const { top: safeAreaHeight } = useSafeAreaInsets();
  const { background, transparent } = useColor();
  const {
    translation,
    handleDragEnd,
    handleHeightChange,
    handleMomentumEnd,
    scrollY,
  } = useSearchBarPosition(scrollRef.current);

  return (
    <View style={{ backgroundColor: background }}>
      <StatusBar style={"auto"} animated={true} translucent={true} />
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

      <View style={styles.hiddenNamu}>
        <NamuWiki />
      </View>

      <SearchBar ref={searchBarRef} translateY={translation} />

      <Animated.ScrollView
        style={styles.result}
        ref={scrollRef}
        scrollEventThrottle={16}
        onScrollEndDrag={handleDragEnd}
        onMomentumScrollEnd={handleMomentumEnd}
        onScrollBeginDrag={() => searchBarRef.current?.blur()}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  y: scrollY,
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

const styles = StyleSheet.create({
  statusBar: {
    zIndex: 10,
    position: "absolute",
    top: 0,
    width: "100%",
    borderBottomWidth: 1,
  },
  result: {
    minHeight: "100%",
  },
  hiddenNamu: {
    width: "100%",
    height: 0,
    position: "absolute",
    zIndex: 10,
  },
});
