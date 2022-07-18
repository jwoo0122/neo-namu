import { Text, View } from "react-native";
import {
  CustomRendererProps,
  isDomElement,
  isDomText,
  TBlock,
} from "react-native-render-html";
import { THEME_DEFAULT } from "../constants/color";

interface Heading2Props extends CustomRendererProps<TBlock> {}

export function Heading2({ TDefaultRenderer, tnode, ...props }: Heading2Props) {
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
        marginTop: 30,
        marginBottom: 20,
      }}
    >
      <View
        style={{
          width: 20,
          height: 2,
          backgroundColor: THEME_DEFAULT,
          marginBottom: 10,
        }}
      />
      <Text
        style={{
          fontSize: 25,
          fontWeight: "bold",
        }}
      >
        {title}
      </Text>
    </View>
  );
}
