import { useContext } from "react";
import { SearchContext } from "../context/SearchContext";

function useSearchState() {
  return useContext(SearchContext);
}

export function useSearchResult() {
  return useSearchState().result;
}

export function useIsLoading() {
  return useSearchState().isLoading;
}

export function useSearchKeyword() {
  return useSearchState().keyword;
}

export function useKeywordHandler() {
  return useSearchState().setKeyword;
}

export function useResultHandler() {
  return useSearchState().setResult;
}