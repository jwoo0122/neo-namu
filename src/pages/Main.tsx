import { View, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { NamuWiki } from "../components/NamuWiki";
import { Result } from "../components/Result";
import { SearchBar } from "../components/SearchBar";
import { useEffect, useRef } from "react";
import { useIsLoading } from "../hooks/useSearch";

export default function Main() {
  const scrollRef = useRef<ScrollView | null>(null);
  const isLoading = useIsLoading();

  useEffect(() => {
    if (!isLoading) {
      scrollRef.current?.scrollTo({ x: 0 });
    }
  }, [isLoading]);

  return (
    <View>
      <StatusBar style="auto" />
      <ScrollView style={{ minHeight: "100%" }} ref={scrollRef}>
        <View>
          <Result />
        </View>
        <NamuWiki />
      </ScrollView>
      <SearchBar />
    </View>
  );
}
