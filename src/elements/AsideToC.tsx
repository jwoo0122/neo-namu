import { StyleSheet, Text, View } from "react-native";
import { CustomRendererProps, TText } from "react-native-render-html";

interface AsideToCProps extends CustomRendererProps<TText> {}

export function AsideToC({ TDefaultRenderer, tnode }: AsideToCProps) {
  console.log(tnode.children[0].children[0].children.length);

  return (
    <View style={styles.wrapper}>
      {tnode.children[0].children.map((node, index) => (
        <View key={index}>
          <Text>hi</Text>
        </View>
      ))}
      {/* <TChildrenRenderer tchildren={tnode.children[0].children} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    borderWidth: 1,
  },
});
