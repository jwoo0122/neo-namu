import { atom, useAtom } from "jotai";

const keywordAtom = atom("");
const resultAtom = atom("");
const isLoadingAtom = atom(false);
const suggestionAtom = atom<string[]>([]);

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
