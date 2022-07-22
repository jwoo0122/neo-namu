import { Text, View } from "react-native";
import {
  CustomRendererProps,
  isDomElement,
  isDomText,
  TBlock,
} from "react-native-render-html";
import { useColor } from "../hooks/useColor";

interface Heading3Props extends CustomRendererProps<TBlock> {}

export function Heading3({ TDefaultRenderer, tnode, ...props }: Heading3Props) {
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
    <View
      style={{
        marginTop: 20,
        marginBottom: 10,
      }}
    >
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          color,
        }}
      >
        {title}
      </Text>
    </View>
  );
}
