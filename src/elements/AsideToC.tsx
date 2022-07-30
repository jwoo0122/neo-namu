import { getInnerHTML } from "domutils";
import { StyleSheet, Text, View } from "react-native";
import {
  CustomRendererProps,
  TChildrenRenderer,
  TText,
} from "react-native-render-html";
import { THEME_ORIGINAL } from "../constants/color";
import { useColor } from "../hooks/useColor";

interface AsideToCProps extends CustomRendererProps<TText> {}

export function AsideToC({ TDefaultRenderer, tnode }: AsideToCProps) {
  const { color } = useColor();

  return (
    <View style={[styles.wrapper, { backgroundColor: THEME_ORIGINAL }]}>
      <Text style={styles.tocTitle}>목차</Text>
      {tnode.children[0].children.map((node) => (
        <Text style={styles.tocItem}>{node.tagName}</Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    borderRadius: 5,
    padding: 15,
  },
  tocTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
  },
  tocItem: {
    fontSize: 18,
    color: "white",
  },
});
