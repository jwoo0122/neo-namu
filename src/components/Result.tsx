import React from "react";
import { Text, useWindowDimensions, View } from "react-native";
import RenderHTML, { Element } from "react-native-render-html";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Anchor } from "../elements/Anchor";
import { BlockQuote } from "../elements/BlockQuote";
import { Heading1 } from "../elements/Heading1";
import { Heading2 } from "../elements/Heading2";
import { Heading3 } from "../elements/Heading3";
import { Heading4 } from "../elements/Heading4";
import { Image } from "../elements/Image";
import { Table } from "../elements/Table";
import { Td } from "../elements/Td";
import { useColor } from "../hooks/useColor";
import { useResult } from "../hooks/useSearch";

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

const renderers = {
  a: Anchor,
  table: Table,
  h1: Heading1,
  h2: Heading2,
  h3: Heading3,
  h4: Heading4,
  blockquote: BlockQuote,
  td: Td,
  img: Image,
  video: () => (
    <View>
      <Text>Video is underdevelopment</Text>
    </View>
  ),
};

function Result() {
  const [result] = useResult();
  const dimension = useWindowDimensions();
  const { background, color } = useColor();

  const { top, bottom } = useSafeAreaInsets();

  return (
    <View
      style={{
        width: "100%",
        paddingHorizontal: 15,
        paddingTop: top,
        paddingBottom: bottom + 50,
        backgroundColor: background,
      }}
    >
      <RenderHTML
        baseStyle={{
          fontSize: 18,
          lineHeight: 27,
          color,
        }}
        contentWidth={dimension.width}
        source={{ html: result || `<div>hi!</div>` }}
        // @ts-ignore
        domVisitors={{ onElement }}
        ignoredDomTags={["noscript", "iframe"]}
        renderers={renderers}
      />
    </View>
  );
}

export default React.memo(Result);
