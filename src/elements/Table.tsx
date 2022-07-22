import { useWindowDimensions } from "react-native";
import { CustomRendererProps, TBlock } from "react-native-render-html";

interface TableProps extends CustomRendererProps<TBlock> {}

export function Table({ TDefaultRenderer, tnode, ...props }: TableProps) {
  const { width } = useWindowDimensions();

  return (
    <TDefaultRenderer
      tnode={tnode}
      {...props}
      style={{
        width: width - 30,
        borderWidth: 1,
        borderColor: "lightgrey",
        marginVertical: 10,
        borderRadius: 10,
        overflow: "hidden",
      }}
    />
  );
}
