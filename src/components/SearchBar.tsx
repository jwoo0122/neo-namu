import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import {
  useIsLoading,
  useKeywordHandler,
  useSearchKeyword,
  useStartSeatching,
  useSuggestion,
} from "../hooks/useSearch";
import { FontAwesome } from "@expo/vector-icons";
import { useColor } from "../hooks/useColor";
import { useState } from "react";

export function SearchBar() {
  const [isFocused, setIsFocused] = useState(false);

  const { background, color } = useColor();
  const isLoading = useIsLoading();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const colorForIcon = isDark ? "white" : "#3F3F3F";
  const { transparent } = useColor();

  const keyword = useSearchKeyword();
  const setKeyword = useKeywordHandler();
  const start = useStartSeatching();
  const suggestion = useSuggestion();

  const handleClickButton = () => {
    start();
  };

  const handleBlur = () => setIsFocused(false);

  const handleFocus = () => setIsFocused(true);

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
          {isFocused && (
            <View style={[styles.suggestions, { backgroundColor: background }]}>
              {suggestion?.reverse().map((_keyword) => (
                <TouchableOpacity
                  key={_keyword}
                  onPress={() => {
                    handleBlur();
                    setKeyword(_keyword);
                    start();
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
