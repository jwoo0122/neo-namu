import { useMemo, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { SearchContext } from "./src/context/SearchContext";
import Main from "./src/pages/Main";

export default function App() {
  const [result, setResult] = useState("");
  const [keyword, setKeyword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSetResult = (_result: string) => {
    setResult(_result);
    setIsLoading(false);
  };
  const handleSetKeyword = (_keyword: string) => {
    setKeyword(_keyword);
    setIsLoading(true);
  };

  const contextValue = useMemo(
    () => ({
      result,
      keyword,
      isLoading,
      setResult: handleSetResult,
      setKeyword: handleSetKeyword,
    }),
    [result, keyword, isLoading, handleSetKeyword, handleSetResult]
  );

  return (
    <SearchContext.Provider value={contextValue}>
      <SafeAreaProvider>
        <Main />
      </SafeAreaProvider>
    </SearchContext.Provider>
  );
}
