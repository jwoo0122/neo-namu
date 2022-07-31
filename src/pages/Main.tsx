import {
  View,
  ScrollView,
  Animated,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import { NamuWiki } from "../components/NamuWiki";
import Result from "../components/Result";
import SearchBar, { SearchBarHandler } from "../components/SearchBar";
import React, { useRef } from "react";
import { useColor } from "../hooks/useColor";
import { useSearchBarPosition } from "../hooks/useSearchBarPosition";
import { SearchBarBackground } from "../components/SearchBarBackground";
import { StatusBar } from "../components/StatusBar";

function Main() {
  const searchBarRef = useRef<SearchBarHandler | null>(null);
  const { width } = useWindowDimensions();

  const scrollRef = useRef<ScrollView | null>(null);
  const { background } = useColor();
  const {
    translation,
    handleDragEnd,
    handleHeightChange,
    handleMomentumEnd,
    scrollY,
  } = useSearchBarPosition(scrollRef.current);

  return (
    <View style={{ backgroundColor: background, width }}>
      <StatusBar />

      <View style={styles.hiddenNamu}>
        <NamuWiki />
      </View>

      <SearchBar ref={searchBarRef} translateY={translation} />

      <SearchBarBackground />

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
  result: {
    width: "100%",
    minHeight: "100%",
  },
  hiddenNamu: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: 0,
    zIndex: 1,
  },
});
