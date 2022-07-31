import { useEffect, useRef } from "react";
import {
  Animated,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  useWindowDimensions,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SEARCHBAR_EASING } from "../constants/animated";
import { SEARCH_BAR_BOTTOM } from "../constants/position";
import { useIsBottomSheetOpened } from "../hooks/useIsBottomSheetOpened";
import { backgroundShadow } from "../styles/background";
import { Entypo, AntDesign, FontAwesome } from "@expo/vector-icons";
import { useColor } from "../hooks/useColor";
import { useIsDarkmode } from "../hooks/useIsDarkmode";
import { useHistory } from "../hooks/useHistory";
import { useSearch } from "../hooks/useSearch";

const SETTING_Y_OFFSET_ON_HIDE = 40;
const SETTING_Y_OFFSET_ON_VISIBLE = 20;

export function Settings() {
  const { height } = useWindowDimensions();
  const { bottom } = useSafeAreaInsets();
  const [isBottomSheetOpened] = useIsBottomSheetOpened();
  const { background, color } = useColor();
  const isDarkmode = useIsDarkmode();
  const [history] = useHistory();

  const search = useSearch();

  const topWhenHide = bottom + SEARCH_BAR_BOTTOM + SETTING_Y_OFFSET_ON_HIDE;

  const top = useRef(new Animated.Value(topWhenHide)).current;

  useEffect(() => {
    Animated.timing(top, {
      toValue: isBottomSheetOpened ? SETTING_Y_OFFSET_ON_VISIBLE : topWhenHide,
      useNativeDriver: true,
      duration: 200,
      easing: SEARCHBAR_EASING,
    }).start();
  }, [isBottomSheetOpened]);

  return (
    <Animated.View
      style={[
        styles.wrapper,
        backgroundShadow.style,
        {
          height: height,
          backgroundColor: background,
          borderColor: isDarkmode ? "#353535" : "#EEEEEE",
          transform: [{ translateY: top }],
        },
      ]}
    >
      <ScrollView contentInset={{ top: 0, bottom: 500 }}>
        <TouchableHighlight
          style={{ marginTop: 16 }}
          onPress={() => alert("Under development")}
          underlayColor={
            isDarkmode ? "rgba(0, 0, 0, 0.2)" : "rgba(255, 255, 255, 0.2)"
          }
        >
          <View style={styles.row}>
            <View style={styles.rowHeader}>
              <AntDesign
                name="setting"
                size={18}
                color={color}
                style={{ marginRight: 8 }}
              />
              <Text style={[styles.rowText, { color }]}>설정</Text>
            </View>
            <Entypo name="chevron-right" size={18} color="grey" />
          </View>
        </TouchableHighlight>
        <View style={styles.historyHeader}>
          <Text style={[styles.historyHeaderText, { color }]}>검색 기록</Text>
        </View>
        {history.length !== 0 ? (
          history.map((keyword, index) => (
            <TouchableHighlight
              key={`${keyword}-${index}`}
              onPress={() => search(keyword)}
              underlayColor={
                isDarkmode ? "rgba(0, 0, 0, 0.2)" : "rgba(255, 255, 255, 0.2)"
              }
            >
              <View style={styles.row}>
                <View style={styles.rowHeader}>
                  <FontAwesome
                    name="search"
                    size={20}
                    color="grey"
                    style={{ marginRight: 8 }}
                  />
                  <Text style={[styles.rowText, { color }]}>{keyword}</Text>
                </View>
              </View>
            </TouchableHighlight>
          ))
        ) : (
          <View style={styles.row}>
            <Text
              style={[
                styles.rowText,
                {
                  color: isDarkmode
                    ? "rgba(255, 255, 255, 0.2)"
                    : "rgba(0, 0, 0, 0.2)",
                },
              ]}
            >
              검색 기록이 없어요.
            </Text>
          </View>
        )}
      </ScrollView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    overflow: "hidden",
    width: "100%",
    backgroundColor: "white",
    position: "absolute",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderWidth: 2,
  },
  rowHeader: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  navigator: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginTop: 16,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: 54,
    paddingRight: 10,
    paddingLeft: 16,
  },
  historyHeader: {
    paddingTop: 28,
    paddingBottom: 12,
    paddingLeft: 16,
  },
  historyHeaderText: {
    fontSize: 30,
    fontWeight: "bold",
  },
  rowText: {
    fontSize: 18,
  },
});
