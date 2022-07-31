import { useColorScheme, useWindowDimensions, View } from "react-native";
import { CustomRendererProps, TText } from "react-native-render-html";
import { FontAwesome } from "@expo/vector-icons";

interface BlockQuoteProps extends CustomRendererProps<TText> {}

const THEME_EXTRA_LIGHT = "#daf2e9";
const THEME_LIGHT = "#cae8dd";

const THEME_EXTRA_LIGHT_DARK = "#2c2c2c";
const THEME_LIGHT_DARK = "#3c3c3c";

export function BlockQuote({
  TDefaultRenderer,
  tnode,
  ...props
}: BlockQuoteProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const { backgroundColor, color } = {
    backgroundColor: isDark ? THEME_EXTRA_LIGHT_DARK : THEME_EXTRA_LIGHT,
    color: isDark ? THEME_LIGHT_DARK : THEME_LIGHT,
  };

  const dimension = useWindowDimensions();

  return (
    <View
      style={{
        width: dimension.width,
        backgroundColor,
        marginLeft: -15,
        marginVertical: 15,
        paddingVertical: 10,
        overflow: "hidden",
      }}
    >
      <FontAwesome
        name="quote-left"
        size={80}
        color={color}
        style={{ position: "absolute", top: -12, left: 10 }}
      />
      <TDefaultRenderer tnode={tnode} {...props} />
    </View>
  );
}
