import { useState } from "react";
import { Button, TextInput, View } from "react-native";
import { useIsLoading, useKeywordHandler } from "../hooks/useSearch";

export function SearchBar() {
  const [inputKeyword, setInputKeyword] = useState("");
  const isLoading = useIsLoading();
  const setKeyword = useKeywordHandler();

  const handleClickButton = () => {
    setKeyword(inputKeyword);
  };

  return (
    <View
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        paddingHorizontal: 10,
      }}
    >
      <TextInput
        value={inputKeyword}
        onChangeText={setInputKeyword}
        style={{
          fontSize: 20,
          width: "100%",
          height: 45,
          paddingHorizontal: 10,
          borderRadius: 12,
          backgroundColor: "white",

          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.22,
          shadowRadius: 2.22,

          elevation: 3,
        }}
      />
      <View
        style={{
          backgroundColor: "#00A495",
          width: "100%",
          height: 45,
          marginTop: 10,
          borderRadius: 12,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button
          title={isLoading ? "로딩 중..." : "검색"}
          onPress={handleClickButton}
          color="white"
        />
      </View>
    </View>
  );
}
