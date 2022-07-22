import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  useIsLoading,
  useKeywordHandler,
  useSearchKeyword,
} from "../hooks/useSearch";
import { FontAwesome } from "@expo/vector-icons";
import { THEME_GRADIENT_BASE, THEME_GRADIENT_END } from "../constants/color";

export function SearchBar() {
  const [inputKeyword, setInputKeyword] = useState("");
  const isLoading = useIsLoading();
  const keyword = useSearchKeyword();
  const setKeyword = useKeywordHandler();

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
        <LinearGradient
          end={{ x: 1, y: 0 }}
          colors={[THEME_GRADIENT_BASE, THEME_GRADIENT_END]}
          style={styles.linearGradient}
        >
          <TextInput
            value={inputKeyword}
            onSubmitEditing={handleClickButton}
            onChangeText={setInputKeyword}
            style={styles.input}
          />
          <View style={styles.searchButton}>
            <TouchableOpacity onPress={handleClickButton}>
              {isLoading ? (
                <ActivityIndicator />
              ) : (
                <FontAwesome
                  name="search"
                  size={20}
                  color={"white"}
                  style={{ marginBottom: 2 }}
                />
              )}
            </TouchableOpacity>
          </View>
        </LinearGradient>
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
      height: 9,
    },
    shadowOpacity: 0.48,
    shadowRadius: 11.95,

    elevation: 18,
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
    backgroundColor: "#5A5A5A",
    width: 44,
    height: 44,
    borderRadius: 22,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
