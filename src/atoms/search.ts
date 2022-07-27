import { atom } from "jotai";

export const keywordAtom = atom("");
export const resultAtom = atom("");
export const isLoadingAtom = atom(false);
export const suggestionAtom = atom<string[]>([]);

export const historyAtom = atom<Set<string>>(new Set(""));
