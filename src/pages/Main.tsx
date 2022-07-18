import { useRef, useState } from "react";
import {
  Button,
  SafeAreaView,
  TextInput,
  View,
  ScrollView,
} from "react-native";
import WebView from "react-native-webview";
import { NamuWiki } from "../backend/namuwiki";
import { Result } from "../components/Result";

export default function Main() {
  const [keyword, setKeyword] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const namuWikiRef = useRef<WebView | null>(null);

  const handleSearch = () => {
    setLoading(true);
    namuWikiRef.current?.postMessage(
      `{ "from": "neo-namu-search", "keyword": "${keyword}" }`
    );
  };

  const handleShowResult = (text: string) => {
    setLoading(false);
    setResult(text);
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            paddingHorizontal: 10,
          }}
        >
          <TextInput
            value={keyword}
            onChangeText={setKeyword}
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
              title={loading ? "로딩 중..." : "검색"}
              onPress={handleSearch}
              color="white"
            />
          </View>
        </View>
        <View style={{ height: 0 }}>
          <NamuWiki ref={namuWikiRef} onSuccess={handleShowResult} />
        </View>
        <View>
          <Result html={result} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
