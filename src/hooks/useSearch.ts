import { useAtom } from "jotai";
import {
  keywordAtom,
  resultAtom,
  isLoadingAtom,
  suggestionAtom,
} from "../atoms/search";

export function useKeyword() {
  return useAtom(keywordAtom);
}

export function useResult() {
  return useAtom(resultAtom);
}

export function useIsLoading() {
  return useAtom(isLoadingAtom);
}

export function useSuggestion() {
  return useAtom(suggestionAtom);
}
