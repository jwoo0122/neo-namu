import { Text, View } from "react-native";
import {
  CustomRendererProps,
  isDomElement,
  isDomText,
  TBlock,
} from "react-native-render-html";
import { useColor } from "../hooks/useColor";

interface Heading4Props extends CustomRendererProps<TBlock> {}

export function Heading4({ TDefaultRenderer, tnode, ...props }: Heading4Props) {
  const { color } = useColor();

  // @ts-ignore
  const title = (() => {
    const targetNode = tnode.domNode.childNodes[2];
    if (isDomElement(targetNode)) {
      const targetSpan = targetNode.children[0];
      if (isDomText(targetSpan)) {
        return targetSpan.data;
      }
    }
    return "";
  })();

  return (
    <View style={{ marginTop: 10, marginBottom: 10 }}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          color,
        }}
      >
        {title}
      </Text>
    </View>
  );
}
