import { atom } from "jotai";

type NavigatorGesture = "back" | "forward" | "setting" | "none";

export const navigatorGestureAtom = atom<NavigatorGesture>("none");
