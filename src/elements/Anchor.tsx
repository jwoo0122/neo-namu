import { CustomRendererProps, TText } from "react-native-render-html";
import { THEME_DEFAULT } from "../constants/color";
import { useKeywordHandler } from "../hooks/useSearch";
import { openBrowserAsync } from "expo-web-browser";

interface AnchorProps extends CustomRendererProps<TText> {}

export function Anchor({ TDefaultRenderer, tnode, ...props }: AnchorProps) {
  const setKeyword = useKeywordHandler();

  const link = decodeURI(tnode.attributes["href"]);
  const isOutlink = link.startsWith("https://");
  const isInternalLink = link.startsWith("/w/");

  const handleClick = () => {
    if (isOutlink) {
      alert("hey");
      openBrowserAsync(link);
    } else if (isInternalLink) {
      setKeyword(link.replace("/w/", ""));
    } else {
      alert("Not supported link");
    }
  };

  if (!isOutlink && !isInternalLink) {
    return null;
  }

  return (
    <>
      <TDefaultRenderer
        onPress={handleClick}
        tnode={tnode}
        {...props}
        style={{
          textDecorationLine: "none",
          color: THEME_DEFAULT,
          marginRight: 10,
        }}
      />
    </>
  );
}
