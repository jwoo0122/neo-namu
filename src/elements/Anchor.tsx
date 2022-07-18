import { CustomRendererProps, TBlock } from "react-native-render-html";
import { useKeywordHandler } from "../hooks/useSearch";

interface AnchorProps extends CustomRendererProps<TBlock> {}

export function Anchor({ TDefaultRenderer, tnode, ...props }: AnchorProps) {
  const setKeyword = useKeywordHandler();

  const handleClick = () => {
    try {
      const link = decodeURI(tnode.attributes["href"]);

      if (link.startsWith("https://")) {
        open(link);
      } else if (link.startsWith("/w/")) {
        setKeyword(link.replace("/w/", ""));
      }
    } catch {
      alert("No search keyword");
    }
  };

  return <TDefaultRenderer onPress={handleClick} tnode={tnode} {...props} />;
}
