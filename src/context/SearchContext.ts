import { createContext } from "react";

interface SearchContextValue {
  result: string;
  keyword: string;
  isLoading: boolean;
  suggestion?: string[];

  setResult: (result: string) => void;
  setKeyword: (keyword: string) => void;
  setSuggestion: (suggestion: string[]) => void;
  start: () => void;
}

export const searchContextInitial: SearchContextValue = {
  result: "",
  keyword: "",
  isLoading: false,
  suggestion: [],

  setResult: () => {},
  setKeyword: () => {},
  setSuggestion: () => {},

  start: () => {},
};

export const SearchContext =
  createContext<SearchContextValue>(searchContextInitial);
