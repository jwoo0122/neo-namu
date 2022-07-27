import { useAtom } from "jotai";
import { bottomSheetOpenedAtom } from "../atoms/bottomSheet";

export function useIsBottomSheetOpened() {
  return useAtom(bottomSheetOpenedAtom);
}
