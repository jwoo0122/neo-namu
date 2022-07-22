import { CustomRendererProps, TText } from "react-native-render-html";
import { THEME_ORIGINAL } from "../constants/color";
import { useKeywordHandler } from "../hooks/useSearch";
import {
  openBrowserAsync,
  WebBrowserPresentationStyle,
} from "expo-web-browser";
import { Entypo } from "@expo/vector-icons";

interface AnchorProps extends CustomRendererProps<TText> {}

export function Anchor({ TDefaultRenderer, tnode, ...props }: AnchorProps) {
  const setKeyword = useKeywordHandler();

  const link = decodeURI(tnode.attributes["href"]);
  const isOutlink = link.startsWith("https://");
  const isInternalLink = link.startsWith("/w/");
  const isImageLink = link.startsWith("/jump/");

  const handleClick = () => {
    if (isOutlink) {
      openBrowserAsync(link, {
        presentationStyle: WebBrowserPresentationStyle.FULL_SCREEN,
      });
    } else if (isInternalLink) {
      setKeyword(link.replace("/w/", ""));
    } else {
      alert("Not supported link");
    }
  };

  if (!isOutlink && !isInternalLink && !isImageLink) {
    return null;
  }

  return (
    <>
      {isOutlink && <Entypo name="link" size={18} color={"#5797ff"} />}
      <TDefaultRenderer
        onPress={handleClick}
        tnode={tnode}
        {...props}
        style={{
          textDecorationLine: "none",
          color: isOutlink ? "#5797ff" : THEME_ORIGINAL,
          marginRight: 10,
        }}
      />
    </>
  );
}
