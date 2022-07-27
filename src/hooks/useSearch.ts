import { useAtom } from "jotai";
import {
  keywordAtom,
  resultAtom,
  isLoadingAtom,
  suggestionAtom,
} from "../atoms/search";
import { useIsBottomSheetOpened } from "./useIsBottomSheetOpened";

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

export function useSearch() {
  const [, setIsBottomSheetOpened] = useIsBottomSheetOpened();
  const [, setIsLoading] = useIsLoading();
  const [, setKeyword] = useKeyword();

  return (keyword: string) => {
    setIsBottomSheetOpened(false);
    setKeyword(keyword);
    setIsLoading(true);
  };
}
