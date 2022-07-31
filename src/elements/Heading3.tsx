import { Text, View } from "react-native";
import { CustomRendererProps, TBlock } from "react-native-render-html";
import { useColor } from "../hooks/useColor";
import { useGetTitle } from "../hooks/useGetTitle";

interface Heading3Props extends CustomRendererProps<TBlock> {}

export function Heading3({ tnode }: Heading3Props) {
  const { color } = useColor();

  const getTitle = useGetTitle();

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
        {getTitle(tnode)}
      </Text>
    </View>
  );
}
