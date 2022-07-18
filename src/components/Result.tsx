import { useWindowDimensions, View } from "react-native";
import RenderHTML, { Element } from "react-native-render-html";
import { Anchor } from "../elements/Anchor";
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

  return (
    <View style={{ width: "100%", padding: 10 }}>
      <RenderHTML
        contentWidth={dimension.width}
        source={{ html: result }}
        // @ts-ignore
        domVisitors={{ onElement }}
        ignoredDomTags={["noscript", "iframe"]}
        renderers={{ a: Anchor }}
      />
    </View>
  );
}
