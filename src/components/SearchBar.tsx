import {
  ActivityIndicator,
  Animated,
  KeyboardAvoidingView,
  PanResponder,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import {
  useIsLoading,
  useKeyword,
  useSearch,
  useSuggestion,
} from "../hooks/useSearch";
import { FontAwesome, Feather } from "@expo/vector-icons";
import { useColor } from "../hooks/useColor";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { useDebouncedCallback } from "use-debounce";
import { LinearGradient } from "expo-linear-gradient";
import { THEME_LIGHT, THEME_ORIGINAL } from "../constants/color";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useIsBottomSheetOpened } from "../hooks/useIsBottomSheetOpened";
import { ZIndex } from "../constants/zIndex";
import { SEARCHBAR_TRANSITION_DURATION } from "../constants/animated";
import { Settings } from "./Settings";
import { SEARCH_BAR_BOTTOM } from "../constants/position";
import { backgroundShadow } from "../styles/background";
import { useNavigatorGesture } from "../hooks/useNavigatorGesture";
import { useNavigation } from "../hooks/useNavigation";

export interface SearchBarHandler {
  blur: () => void;
}

interface SearchBarProps {
  translateY?: Animated.AnimatedInterpolation;
}

function SearchBar(
  { translateY }: SearchBarProps,
  ref: React.ForwardedRef<SearchBarHandler>
) {
  const searchBarTranslation = useRef(
    new Animated.Value(-SEARCH_BAR_BOTTOM)
  ).current;
  const searchBarTranslationValue = useRef(-SEARCH_BAR_BOTTOM);

  const joystickTranslation = useRef(
    new Animated.ValueXY({ x: 0, y: 0 })
  ).current;

  const [navigatorGesture, setNavigatorGesture] = useNavigatorGesture();
  const { goBack, goForward, goRecent } = useNavigation();
  const navigatorGestureValue = useRef(navigatorGesture);
  const [isBottomSheetOpened, setIsBottomSheetOpened] =
    useIsBottomSheetOpened();
  const isBottomSheetOpenedValue = useRef(false);

  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<TextInput | null>(null);
  const [localKeyword, setLocalKeyword] = useState("");

  const { bottom: safeAreaBottom } = useSafeAreaInsets();
  const { background, color } = useColor();
  const [isLoading] = useIsLoading();
  const search = useSearch();

  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const colorForIcon = isDark ? "white" : "#3F3F3F";
  const colorForButtons = isDark ? "#5A5A5A" : "#DFDFDF";

  const colorForJoystick = isDark ? "white" : "black";

  const { transparent } = useColor();

  const [keyword, setKeyword] = useKeyword();
  const [suggestion] = useSuggestion();
  const [, setIsLoading] = useIsLoading();

  const handleClickButton = () => {
    goRecent();
    handleBlur();
    setIsLoading(true);
  };

  const handleBlur = () => setIsFocused(false);

  const handleFocus = () => {
    setKeyword(keyword);
    setIsFocused(true);
    setIsBottomSheetOpened(false);
  };

  const handleLocalKeywordChange = useDebouncedCallback(
    (_localKeyword: string) => {
      setKeyword(_localKeyword);
    },
    200
  );

  const goDown = () => {
    Animated.timing(searchBarTranslation, {
      toValue: -20,
      useNativeDriver: true,
      duration: SEARCHBAR_TRANSITION_DURATION,
    }).start();
  };

  const goUp = () => {
    Animated.timing(searchBarTranslation, {
      toValue: -500,
      useNativeDriver: true,
      duration: SEARCHBAR_TRANSITION_DURATION,
    }).start();
  };

  const goBackForPanResponder = useRef(goBack);
  useEffect(() => {
    goBackForPanResponder.current = goBack;
  }, [goBack]);
  const goForwardForPanResponder = useRef(goForward);
  useEffect(() => {
    goForwardForPanResponder.current = goForward;
  }, [goForward]);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onPanResponderMove: Animated.event(
        [
          null,
          {
            dx: joystickTranslation.x,
            dy: joystickTranslation.y,
          },
        ],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: () => {
        if (
          navigatorGestureValue.current === "setting" &&
          !isBottomSheetOpenedValue.current
        ) {
          setIsBottomSheetOpened(true);
          goUp();
        } else if (navigatorGestureValue.current === "back") {
          goBackForPanResponder.current();
        } else if (navigatorGestureValue.current === "forward") {
          goForwardForPanResponder.current();
        }

        Animated.timing(joystickTranslation, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: true,
          duration: SEARCHBAR_TRANSITION_DURATION,
        }).start();

        joystickTranslation.flattenOffset();
      },
    })
  ).current;

  useEffect(() => {
    isBottomSheetOpenedValue.current = isBottomSheetOpened;

    if (isBottomSheetOpened) {
      goUp();
    } else {
      goDown();
    }
  }, [isBottomSheetOpened]);

  useEffect(() => {
    handleLocalKeywordChange(localKeyword);
  }, [localKeyword, handleLocalKeywordChange]);

  useEffect(() => {
    if (keyword !== localKeyword) {
      setLocalKeyword(keyword);
    }
  }, [keyword]);

  useEffect(() => {
    const listener = searchBarTranslation.addListener(({ value }) => {
      searchBarTranslationValue.current = value;
    });

    return () => searchBarTranslation.removeListener(listener);
  }, [searchBarTranslation]);

  useEffect(() => {
    navigatorGestureValue.current = navigatorGesture;
  }, [navigatorGesture]);

  useEffect(() => {
    const listener = joystickTranslation.addListener(({ x, y }) => {
      const distance = Math.floor(y ** 2 + x ** 2);
      const joystickAngle = y / x;

      if (distance <= 3000) {
        setNavigatorGesture("none");
        return;
      }

      if (joystickAngle >= -1 && joystickAngle < 0) {
        setNavigatorGesture("forward");
      } else if (joystickAngle < -1 || joystickAngle > 1) {
        setNavigatorGesture("setting");
      } else if (joystickAngle <= 1 && joystickAngle >= 0) {
        setNavigatorGesture("back");
      }
    });

    return () => joystickTranslation.removeListener(listener);
  }, [joystickTranslation]);

  useImperativeHandle(ref, () => ({
    blur: () => inputRef.current?.blur(),
  }));

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={10}
      style={[
        styles.keyboardAvoiding,
        {
          marginBottom: safeAreaBottom,
        },
      ]}
    >
      <Animated.View
        style={{
          width: "100%",
          transform: [
            {
              translateY,
            },
          ],
        }}
      >
        <Animated.View
          style={[
            styles.positioner,
            {
              transform: [{ translateY: searchBarTranslation }],
            },
          ]}
        >
          <Settings />
          <View style={[styles.wrapper, backgroundShadow.style]}>
            <View
              style={styles.joystickWrapper}
              pointerEvents={isBottomSheetOpened || isFocused ? "none" : "auto"}
              {...panResponder.panHandlers}
            >
              <Animated.View
                style={[
                  styles.joystick,
                  {
                    backgroundColor: transparent,
                    borderColor: colorForJoystick,
                    transform: [
                      { translateX: joystickTranslation.x },
                      { translateY: joystickTranslation.y },
                    ],
                  },
                ]}
              />
            </View>

            <LinearGradient
              end={{ x: 0.5, y: 1 }}
              colors={[THEME_ORIGINAL, THEME_LIGHT]}
              style={styles.linearGradient}
            >
              <View
                style={[
                  styles.searchBarWrapper,
                  { backgroundColor: background },
                ]}
              >
                {isFocused && suggestion && suggestion.length !== 0 && (
                  <View
                    style={[
                      styles.suggestions,
                      { backgroundColor: background },
                    ]}
                  >
                    {suggestion.map((_keyword) => (
                      <TouchableOpacity
                        key={_keyword}
                        onPress={() => {
                          goRecent();
                          handleBlur();
                          search(_keyword);
                        }}
                      >
                        <View style={styles.suggestionItem}>
                          <Text style={{ color, fontSize: 17 }}>
                            {_keyword}
                          </Text>
                          <Feather
                            name="arrow-up-right"
                            size={20}
                            color={colorForButtons}
                          />
                        </View>
                      </TouchableOpacity>
                    )) || null}
                    <View
                      style={{
                        width: "100%",
                        height: 2,
                        backgroundColor: transparent,
                      }}
                    />
                  </View>
                )}

                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <TextInput
                    ref={inputRef}
                    placeholder="나무위키에서 검색..."
                    value={localKeyword}
                    onSubmitEditing={handleClickButton}
                    onChangeText={setLocalKeyword}
                    style={[styles.input, { color }]}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  />
                  <View
                    style={[
                      styles.searchButton,
                      { backgroundColor: colorForButtons },
                    ]}
                  >
                    <TouchableOpacity onPress={handleClickButton}>
                      {isLoading ? (
                        <ActivityIndicator color={colorForIcon} />
                      ) : (
                        <FontAwesome
                          name="search"
                          size={20}
                          color={colorForIcon}
                          style={{ marginBottom: 2 }}
                        />
                      )}
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </LinearGradient>
          </View>
        </Animated.View>
      </Animated.View>
    </KeyboardAvoidingView>
  );
}

export default forwardRef(SearchBar);

const BASE_BORDER_RADIUS = 30;

const styles = StyleSheet.create({
  keyboardAvoiding: {
    position: "absolute",
    zIndex: ZIndex.SEARCHBAR,
    bottom: 0,
    width: "100%",
  },
  positioner: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  joystickWrapper: {
    position: "absolute",
    display: "flex",
    alignItems: "center",
    top: -36,
    zIndex: ZIndex.SEARCHBAR_JOYSTICK,
  },
  joystick: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 4,
  },
  wrapper: {
    width: "100%",
    position: "absolute",
    bottom: 0,
    borderRadius: BASE_BORDER_RADIUS,
    display: "flex",
    alignItems: "center",
  },
  linearGradient: {
    width: "100%",
    padding: 3,
    borderRadius: BASE_BORDER_RADIUS,
  },
  searchBarWrapper: {
    borderRadius: 27,
  },
  suggestions: {
    paddingTop: 18,
    paddingHorizontal: 20,
    borderTopLeftRadius: 29,
    borderTopRightRadius: 29,
    backgroundColor: "red",
  },
  suggestionItem: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  input: {
    flex: 1,
    fontSize: 20,
    height: 42,
    paddingHorizontal: 10,
    marginLeft: 10,
    color: "white",
    fontWeight: "bold",
  },
  searchButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
});
