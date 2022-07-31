import { CustomRendererProps, TBlock } from "react-native-render-html";

interface TableProps extends CustomRendererProps<TBlock> {}

export function Table({ TDefaultRenderer, tnode, ...props }: TableProps) {
  return (
    <TDefaultRenderer
      tnode={tnode}
      {...props}
      style={{
        ...props.style,
        maxWidth: "100%",
        width: "100%",
        borderWidth: 1,
        borderColor: "lightgrey",
        marginVertical: 10,
        borderRadius: 10,
        overflow: "hidden",
      }}
    />
  );
}
