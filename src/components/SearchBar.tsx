import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import {
  useIsLoading,
  useKeywordHandler,
  useSearchKeyword,
} from "../hooks/useSearch";
import { FontAwesome } from "@expo/vector-icons";
import { useColor } from "../hooks/useColor";

export function SearchBar() {
  const { background, color } = useColor();
  const [inputKeyword, setInputKeyword] = useState("");
  const isLoading = useIsLoading();
  const keyword = useSearchKeyword();
  const setKeyword = useKeywordHandler();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const colorForIcon = isDark ? "white" : "#3F3F3F";

  const handleClickButton = () => {
    setKeyword(inputKeyword);
  };

  useEffect(() => {
    setInputKeyword(keyword);
  }, [keyword]);

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
          <TextInput
            placeholder="나무위키에서 검색..."
            value={inputKeyword}
            onSubmitEditing={handleClickButton}
            onChangeText={setInputKeyword}
            style={[styles.input, { color }]}
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
  );
}

const styles = StyleSheet.create({
  inputWrapper: {
    width: "100%",
    height: 58,
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
  },
  linearGradient: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
    paddingRight: 4,
    borderRadius: 29,
  },
  input: {
    flex: 1,
    fontSize: 17,
    height: 40,
    paddingHorizontal: 10,
    color: "white",
  },
  searchButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
