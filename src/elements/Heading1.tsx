import { Text, View } from "react-native";
import {
  CustomRendererProps,
  isDomElement,
  isDomText,
  TText,
} from "react-native-render-html";
import { useColor } from "../hooks/useColor";

interface Heading1Props extends CustomRendererProps<TText> {}

export function Heading1({ TDefaultRenderer, tnode, ...props }: Heading1Props) {
  const { color } = useColor();

  const title = (() => {
    const targetNode = tnode.domNode.children[0];
    if (isDomElement(targetNode)) {
      const categoryNode = targetNode.childNodes[0];
      const title = targetNode.childNodes[1];
      if (isDomText(title) && isDomElement(categoryNode)) {
        const category = categoryNode.childNodes[0];

        if (isDomText(category)) {
          return [category.data, title.data].join("");
        }
      } else if (isDomText(title)) {
        return title.data;
      }
    }
    return "";
  })();

  return (
    <View
      style={{
        width: "100%",
        marginBottom: 10,
        height: 65,
        paddingTop: 10,
      }}
    >
      <Text
        style={{
          fontSize: 40,
          fontWeight: "bold",
          color,
        }}
      >
        {title}
      </Text>
    </View>
  );
}
