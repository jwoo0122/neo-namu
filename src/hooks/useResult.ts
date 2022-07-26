import { useState } from "react";
import { useQuery } from "react-query";

export function useResult() {
  const [keyword, setKeyword] = useState("");

  const searchResult = useQuery(["searchResult", keyword]);

  return {
    searchResult,
    setKeyword,
  } as const;
}
