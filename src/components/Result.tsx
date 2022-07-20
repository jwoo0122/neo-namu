import { Text, useWindowDimensions, View } from "react-native";
import RenderHTML, { Element } from "react-native-render-html";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Anchor } from "../elements/Anchor";
import { Heading2 } from "../elements/Heading2";
import { Heading3 } from "../elements/Heading3";
import { Heading4 } from "../elements/Heading4";
import { useSearchResult } from "../hooks/useSearch";

function UnderDevelopment() {
  return (
    <View
      style={{
        width: "100%",
        backgroundColor: "lightgrey",
        borderRadius: 10,
        height: 50,
      }}
    >
      <Text style={{ color: "white", textAlign: "center" }}>
        Under Development Element (table)
      </Text>
    </View>
  );
}

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

  const { top, bottom } = useSafeAreaInsets();

  return (
    <View
      style={{
        width: "100%",
        paddingHorizontal: 15,
        paddingTop: top,
        paddingBottom: bottom + 50,
      }}
    >
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
        renderers={{
          a: Anchor,
          table: () => <UnderDevelopment />,
          h2: Heading2,
          h3: Heading3,
          h4: Heading4,
        }}
      />
    </View>
  );
}
