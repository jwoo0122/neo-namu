import { Text, View } from "react-native";
import { CustomRendererProps, TBlock } from "react-native-render-html";
import { useColor } from "../hooks/useColor";
import { useGetTitle } from "../hooks/useGetTitle";

interface Heading4Props extends CustomRendererProps<TBlock> {}

export function Heading4({ tnode }: Heading4Props) {
  const { color } = useColor();

  const getTitle = useGetTitle();

  return (
    <View style={{ marginTop: 10, marginBottom: 10 }}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          color,
        }}
      >
        {getTitle(tnode)}
      </Text>
    </View>
  );
}
