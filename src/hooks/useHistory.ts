import { useAtom } from "jotai";
import { historyAtom } from "../atoms/search";

export function useHistory() {
  const [historySet, setHistory] = useAtom(historyAtom);

  return [
    Array.from(historySet)
      .filter((h) => h)
      .reverse(),
    setHistory,
  ] as const;
}
