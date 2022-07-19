import { useWindowDimensions, View } from "react-native";
import RenderHTML, { Element } from "react-native-render-html";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Anchor } from "../elements/Anchor";
import { Heading2 } from "../elements/Heading2";
import { useSearchResult } from "../hooks/useSearch";

function onElement(element: Element) {
  if (element.attribs["src"]) {
    const originalSrc = element.attribs["src"];

    if (originalSrc.startsWith("//")) {
      element.attribs["src"] = `https:${originalSrc}`;
      return;
    }

    if (originalSrc.startsWith("/")) {
      element.attribs["src"] = `https://namu.wiki${originalSrc}`;
    }
  }
}

export function Result() {
  const result = useSearchResult();
  const dimension = useWindowDimensions();

  const { top } = useSafeAreaInsets();

  return (
    <View style={{ width: "100%", paddingHorizontal: 15, paddingTop: top }}>
      <RenderHTML
        baseStyle={{
          fontSize: 18,
          lineHeight: 27,
        }}
        contentWidth={dimension.width}
        source={{ html: result }}
        // @ts-ignore
        domVisitors={{ onElement }}
        ignoredDomTags={["noscript", "iframe"]}
        renderers={{ a: Anchor, h2: Heading2 }}
      />
    </View>
  );
}
