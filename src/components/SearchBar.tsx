import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  useIsLoading,
  useKeywordHandler,
  useSearchKeyword,
} from "../hooks/useSearch";
import { FontAwesome } from "@expo/vector-icons";

export function SearchBar() {
  const [inputKeyword, setInputKeyword] = useState("");
  const isLoading = useIsLoading();
  const keyword = useSearchKeyword();
  const setKeyword = useKeywordHandler();

  const { bottom } = useSafeAreaInsets();

  const handleClickButton = () => {
    setKeyword(inputKeyword);
  };

  useEffect(() => {
    setInputKeyword(keyword);
  }, [keyword]);

  return (
    <KeyboardAvoidingView
      behavior={"padding"}
      keyboardVerticalOffset={10}
      style={{
        position: "absolute",
        bottom: 0,
        display: "flex",
        alignItems: "center",
        width: "100%",
        paddingHorizontal: 10,
        marginBottom: bottom,
      }}
    >
      <View style={styles.inputWrapper}>
        <LinearGradient
          end={{ x: 1, y: 0 }}
          colors={["#00A495", "#13AD65"]}
          style={styles.linearGradient}
        >
          <TextInput
            value={inputKeyword}
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
                  color="white"
                  style={{ marginBottom: 2 }}
                />
              )}
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
    </KeyboardAvoidingView>
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
    borderWidth: 2,
    borderColor: "#048c7f",
  },
  linearGradient: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
    paddingRight: 8,
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
    backgroundColor: "#614D42",
    width: 36,
    height: 36,
    borderRadius: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
