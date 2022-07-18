import { createContext } from "react";

interface SearchContextValue {
  result: string;
  keyword: string;
  isLoading: boolean;

  setResult: (result: string) => void;
  setKeyword: (keyword: string) => void;
}

export const searchContextInitial = {
  result: "",
  keyword: "",
  isLoading: false,

  setResult: () => {},
  setKeyword: () => {},
};

export const SearchContext =
  createContext<SearchContextValue>(searchContextInitial);
