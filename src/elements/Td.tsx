import { CustomRendererProps, TBlock } from "react-native-render-html";

interface TdProps extends CustomRendererProps<TBlock> {}

export function Td({ TDefaultRenderer, tnode, ...props }: TdProps) {
  return (
    <TDefaultRenderer
      tnode={tnode}
      {...props}
      style={{
        ...props.style,
        paddingTop: 8,
        paddingRight: 8,
        paddingBottom: 8,
        paddingLeft: 8,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    />
  );
}
