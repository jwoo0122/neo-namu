import { SafeAreaView, View, ScrollView } from "react-native";
import { NamuWiki } from "../components/NamuWiki";
import { Result } from "../components/Result";
import { SearchBar } from "../components/SearchBar";

export default function Main() {
  return (
    <SafeAreaView>
      <ScrollView>
        <SearchBar />
        <View>
          <Result />
        </View>
        <NamuWiki />
      </ScrollView>
    </SafeAreaView>
  );
}
