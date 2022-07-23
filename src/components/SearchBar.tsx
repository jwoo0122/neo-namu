import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { useIsLoading, useKeyword, useSuggestion } from "../hooks/useSearch";
import { FontAwesome, Feather } from "@expo/vector-icons";
import { useColor } from "../hooks/useColor";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { useDebouncedCallback } from "use-debounce";
import { LinearGradient } from "expo-linear-gradient";
import { THEME_LIGHT, THEME_ORIGINAL } from "../constants/color";

export interface SearchBarHandler {
  blur: () => void;
}

function SearchBar(_: any, ref: React.ForwardedRef<SearchBarHandler>) {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<TextInput | null>(null);
  const [localKeyword, setLocalKeyword] = useState("");

  const { background, color } = useColor();
  const [isLoading] = useIsLoading();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const colorForIcon = isDark ? "white" : "#3F3F3F";
  const colorForButtons = isDark ? "#5A5A5A" : "#DFDFDF";
  const { transparent } = useColor();

  const [keyword, setKeyword] = useKeyword();
  const [suggestion] = useSuggestion();
  const [, setIsLoading] = useIsLoading();

  const handleClickButton = () => {
    setIsLoading(true);
  };

  const handleBlur = () => setIsFocused(false);

  const handleFocus = () => {
    setKeyword(keyword);
    setIsFocused(true);
  };

  const handleLocalKeywordChange = useDebouncedCallback(
    (_localKeyword: string) => {
      setKeyword(_localKeyword);
    },
    200
  );

  useEffect(() => {
    handleLocalKeywordChange(localKeyword);
  }, [localKeyword, handleLocalKeywordChange]);

  useEffect(() => {
    if (keyword !== localKeyword) {
      setLocalKeyword(keyword);
    }
  }, [keyword]);

  useImperativeHandle(ref, () => ({
    blur: () => inputRef.current?.blur(),
  }));

  return (
    <View style={styles.positioner}>
      <View style={styles.wrapper}>
        <LinearGradient
          end={{ x: 0.5, y: 1 }}
          colors={[THEME_ORIGINAL, THEME_LIGHT]}
          style={styles.linearGradient}
        >
          <View
            style={[styles.searchBarWrapper, { backgroundColor: background }]}
          >
            {isFocused && suggestion && suggestion.length !== 0 && (
              <View
                style={[styles.suggestions, { backgroundColor: background }]}
              >
                {suggestion.map((_keyword) => (
                  <TouchableOpacity
                    key={_keyword}
                    onPress={() => {
                      handleBlur();
                      setKeyword(_keyword);
                      setIsLoading(true);
                    }}
                  >
                    <View style={styles.suggestionItem}>
                      <Text style={{ color, fontSize: 17 }}>{_keyword}</Text>
                      <Feather
                        name="arrow-up-right"
                        size={20}
                        color={colorForButtons}
                      />
                    </View>
                  </TouchableOpacity>
                )) || null}
                <View
                  style={{
                    width: "100%",
                    height: 2,
                    backgroundColor: transparent,
                  }}
                />
              </View>
            )}

            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <TextInput
                ref={inputRef}
                placeholder="나무위키에서 검색..."
                value={localKeyword}
                onSubmitEditing={handleClickButton}
                onChangeText={setLocalKeyword}
                style={[styles.input, { color }]}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
              <View
                style={[
                  styles.searchButton,
                  { backgroundColor: colorForButtons },
                ]}
              >
                <TouchableOpacity onPress={handleClickButton}>
                  {isLoading ? (
                    <ActivityIndicator color={colorForIcon} />
                  ) : (
                    <FontAwesome
                      name="search"
                      size={20}
                      color={colorForIcon}
                      style={{ marginBottom: 2 }}
                    />
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </LinearGradient>
      </View>
    </View>
  );
}

export default forwardRef(SearchBar);

const BASE_BORDER_RADIUS = 30;

const styles = StyleSheet.create({
  positioner: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  wrapper: {
    width: "100%",
    position: "absolute",
    bottom: 0,
    borderRadius: BASE_BORDER_RADIUS,

    /* Shadow */
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  linearGradient: {
    width: "100%",
    padding: 3,
    borderRadius: BASE_BORDER_RADIUS,
  },
  searchBarWrapper: {
    borderRadius: 27,
  },
  suggestions: {
    paddingTop: 18,
    paddingHorizontal: 20,
    borderTopLeftRadius: 29,
    borderTopRightRadius: 29,
    backgroundColor: "red",
  },
  suggestionItem: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  input: {
    flex: 1,
    fontSize: 17,
    height: 40,
    paddingHorizontal: 10,
    marginLeft: 10,
    color: "white",
    fontWeight: "bold",
  },
  searchButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
});
