import { CustomRendererProps, TBlock } from "react-native-render-html";

interface TdProps extends CustomRendererProps<TBlock> {}

export function Td({ TDefaultRenderer, tnode, ...props }: TdProps) {
  return (
    <TDefaultRenderer
      tnode={tnode}
      {...props}
      style={{
        ...props.style,
        width: "100%",
        padding: 5,
      }}
    />
  );
}
