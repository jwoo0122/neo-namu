import { useWindowDimensions, View } from "react-native";
import { CustomRendererProps, TText } from "react-native-render-html";
import { THEME_EXTRA_LIGHT, THEME_LIGHT } from "../constants/color";
import { FontAwesome } from "@expo/vector-icons";

interface BlockQuoteProps extends CustomRendererProps<TText> {}

export function BlockQuote({
  TDefaultRenderer,
  tnode,
  ...props
}: BlockQuoteProps) {
  const dimension = useWindowDimensions();

  return (
    <View
      style={{
        width: dimension.width,
        backgroundColor: THEME_EXTRA_LIGHT,
        marginLeft: -15,
        marginVertical: 15,
        paddingVertical: 10,
        overflow: "hidden",
      }}
    >
      <FontAwesome
        name="quote-left"
        size={80}
        color={THEME_LIGHT}
        style={{ position: "absolute", top: -10, left: 10 }}
      />
      <TDefaultRenderer tnode={tnode} {...props} />
    </View>
  );
}
