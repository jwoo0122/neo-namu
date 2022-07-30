import { Text, View } from "react-native";
import { CustomRendererProps, TBlock } from "react-native-render-html";
import { THEME_ORIGINAL } from "../constants/color";
import { useColor } from "../hooks/useColor";
import { useGetTitle } from "../hooks/useGetTitle";

interface Heading2Props extends CustomRendererProps<TBlock> {}

export function Heading2({ tnode }: Heading2Props) {
  const { color } = useColor();

  const getTitle = useGetTitle();

  return (
    <View
      style={{
        marginTop: 25,
        marginBottom: 10,
      }}
    >
      <View
        style={{
          width: 20,
          height: 2,
          backgroundColor: THEME_ORIGINAL,
          marginBottom: 10,
        }}
      />
      <Text
        style={{
          fontSize: 28,
          fontWeight: "bold",
          color,
        }}
      >
        {getTitle(tnode)}
      </Text>
    </View>
  );
}
