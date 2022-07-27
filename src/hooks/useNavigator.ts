import { useAtom } from "jotai";
import { navigatorAtom } from "../atoms/navigator";

export function useNavigator() {
  return useAtom(navigatorAtom);
}
