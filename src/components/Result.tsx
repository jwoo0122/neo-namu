import { getElementsByTagName, removeElement } from "domutils";
import React, { useEffect, useMemo } from "react";
import { ActivityIndicator, useWindowDimensions, View } from "react-native";
import {
  RenderHTMLConfigProvider,
  RenderHTMLSource,
  TRenderEngineProvider,
  useAmbientTRenderEngine,
} from "react-native-render-html";
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
import { useIsLoading, useResult } from "../hooks/useSearch";

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
};

interface NeoNamuRenderHTMLProps {
  html: string;
}

function NeoNamuRenderHTML({ html }: NeoNamuRenderHTMLProps) {
  const [isLoading, setIsLoading] = useIsLoading();
  const engine = useAmbientTRenderEngine();
  const dom = useMemo(() => engine.parseDocument(html), [html, engine]);
  const dimension = useWindowDimensions();

  useEffect(() => {
    // @ts-ignore
    getElementsByTagName("a", dom, true).forEach((anchor) => {
      if (anchor.attribs["src"]) {
        const originalSrc = anchor.attribs["src"];

        if (originalSrc.startsWith("//")) {
          anchor.attribs["src"] = `https:${originalSrc}`;
          return;
        }

        if (originalSrc.startsWith("/")) {
          anchor.attribs["src"] = `https://namu.wiki${originalSrc}`;
          return;
        }
      }
    });

    // @ts-ignore
    const h2s = getElementsByTagName("h2", dom, true);
    const parent = h2s[1]?.parent;

    if (parent) {
      removeElement(parent.childNodes[parent.childNodes.length - 2]);
    }

    // @ts-ignore
    const footer = getElementsByTagName("footer", dom, true)[0];
    if (footer) {
      removeElement(footer);
    }

    setIsLoading(false);
  }, [dom]);

  return isLoading ? (
    <ActivityIndicator color="black" />
  ) : (
    <RenderHTMLSource source={{ dom }} contentWidth={dimension.width} />
  );
}

function Result() {
  const [result] = useResult();
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
      <TRenderEngineProvider
        baseStyle={{
          fontSize: 18,
          lineHeight: 27,
          color,
        }}
        ignoredDomTags={["noscript", "iframe", "video"]}
      >
        <RenderHTMLConfigProvider renderers={renderers}>
          <NeoNamuRenderHTML html={result} />
        </RenderHTMLConfigProvider>
      </TRenderEngineProvider>
    </View>
  );
}

export default React.memo(Result);
