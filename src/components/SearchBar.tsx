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
import { FontAwesome } from "@expo/vector-icons";
import { useColor } from "../hooks/useColor";
import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

export interface SearchBarHandler {
  blur: () => void;
}

function SearchBar(_: any, ref: React.ForwardedRef<SearchBarHandler>) {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<TextInput | null>(null);

  const { background, color } = useColor();
  const [isLoading] = useIsLoading();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const colorForIcon = isDark ? "white" : "#3F3F3F";
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

  useImperativeHandle(ref, () => ({
    blur: () => inputRef.current?.blur(),
  }));

  return (
    <View
      style={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        paddingHorizontal: 10,
      }}
    >
      <View style={styles.inputWrapper}>
        <View style={[styles.linearGradient, { backgroundColor: background }]}>
          {isFocused && suggestion && suggestion.length !== 0 && (
            <View style={[styles.suggestions, { backgroundColor: background }]}>
              {suggestion.reverse().map((_keyword) => (
                <TouchableOpacity
                  key={_keyword}
                  onPress={() => {
                    handleBlur();
                    setKeyword(_keyword);
                    setIsLoading(true);
                  }}
                >
                  <View style={{ width: "100%", marginBottom: 10 }}>
                    <Text style={{ color }}>{_keyword}</Text>
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
              value={keyword}
              onSubmitEditing={handleClickButton}
              onChangeText={setKeyword}
              style={[styles.input, { color }]}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            <View
              style={[
                styles.searchButton,
                { backgroundColor: isDark ? "#5A5A5A" : "#DFDFDF" },
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
      </View>
    </View>
  );
}

export default forwardRef(SearchBar);

const styles = StyleSheet.create({
  inputWrapper: {
    width: "100%",
  },
  linearGradient: {
    borderRadius: 29,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,

    borderWidth: 3,
    borderColor: "#0cad80",
    width: "100%",
    position: "absolute",
    bottom: 0,
  },
  suggestions: {
    paddingTop: 15,
    paddingHorizontal: 15,
    borderTopLeftRadius: 29,
    borderTopRightRadius: 29,
    backgroundColor: "red",
  },
  input: {
    flex: 1,
    fontSize: 17,
    height: 40,
    paddingHorizontal: 10,
    marginLeft: 10,
    color: "white",
  },
  searchButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: 8,
  },
});
