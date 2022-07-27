import { useAtom } from "jotai";
import { navigatorGestureAtom } from "../atoms/navigatorGesture";

export function useNavigatorGesture() {
  return useAtom(navigatorGestureAtom);
}
