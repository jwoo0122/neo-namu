import { View, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { NamuWiki } from "../components/NamuWiki";
import { Result } from "../components/Result";
import { SearchBar } from "../components/SearchBar";

export default function Main() {
  return (
    <View>
      <StatusBar style="auto" />
      <ScrollView>
        <View>
          <Result />
        </View>
        <NamuWiki />
      </ScrollView>
      <SearchBar />
    </View>
  );
}
