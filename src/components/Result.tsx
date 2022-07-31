import { iframeModel } from "@native-html/iframe-plugin";
import { filter, getElementsByTagName, removeElement } from "domutils";
import React, { useEffect, useMemo } from "react";
import { ActivityIndicator, useWindowDimensions, View } from "react-native";
import {
  RenderHTMLConfigProvider,
  RenderHTMLSource,
  TRenderEngineProvider,
  useAmbientTRenderEngine,
  Element,
} from "react-native-render-html";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Anchor } from "../elements/Anchor";
import { AsideToC } from "../elements/AsideToC";
import { BlockQuote } from "../elements/BlockQuote";
import { Heading1 } from "../elements/Heading1";
import { Heading2 } from "../elements/Heading2";
import { Heading3 } from "../elements/Heading3";
import { Heading4 } from "../elements/Heading4";
import { Image } from "../elements/Image";
import { Table } from "../elements/Table";
import { Td } from "../elements/Td";
import { Youtube } from "../elements/Youtube";
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
  aside: AsideToC,
  iframe: Youtube,
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
    (
      filter(
        (elem) => (elem as Element).attribs?.["src"] != null,
        // @ts-ignore
        dom,
        true
      ) as Array<Element>
    ).forEach((anchor) => {
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
      /**
       * Remove advertisements
       */
      removeElement(parent.childNodes[parent.childNodes.length - 2]);
    }

    // @ts-ignore
    const footer = getElementsByTagName("footer", dom, true)[0];
    if (footer) {
      /**
       * Remove disclaimer
       */
      removeElement(footer);
    }

    // @ts-ignore
    const h1 = getElementsByTagName("h1", dom, true)[0];

    const h1Index = h1?.parent?.children.findIndex((node) => node === h1);

    if (h1 && h1.parent && h1.parent.children && h1Index) {
      /**
       * Remove edit row
       */
      removeElement(h1.parent.children[h1Index - 2]);
      /**
       * Remove recent edit timestamp
       */
      removeElement(h1.parent.children[h1Index + 2]);
    }

    const withHardWidth = filter(
      (elem) =>
        (elem as Element).attribs?.["style"]?.includes("width") ||
        (elem as Element).attribs?.["width"] != null,
      // @ts-ignore
      dom,
      true
    );
    withHardWidth.forEach((elm) => {
      const originalStyle = (elm as Element).attribs["style"];

      if (originalStyle) {
        const styleWithMaxWidth = originalStyle + " max-width: 100%;";
        (elm as Element).attribs["style"] = styleWithMaxWidth;
      }
    });

    setIsLoading(false);
  }, [dom]);

  return isLoading ? (
    <ActivityIndicator color="black" />
  ) : (
    <RenderHTMLSource source={{ dom }} contentWidth={dimension.width} />
  );
}

const ignoredDomTags = ["noscript", "video", "math", "svg"];
const ignoredStyles = ["position"];
const customHTMLElementModels = {
  iframe: iframeModel,
};

function Result() {
  const [result] = useResult();
  const { background, color } = useColor();
  const { width } = useWindowDimensions();

  const { top, bottom } = useSafeAreaInsets();

  const baseStyle = useMemo(
    () => ({
      maxWidth: "100%",
      fontSize: 18,
      lineHeight: 27,
      color,
    }),
    [color]
  );

  return (
    <View
      style={{
        width: width - 30,
        display: "flex",
        flexDirection: "row",
        marginHorizontal: 15,
        paddingTop: top + 50,
        paddingBottom: bottom + 510,
        backgroundColor: background,
      }}
    >
      <TRenderEngineProvider
        baseStyle={baseStyle}
        customHTMLElementModels={customHTMLElementModels}
        ignoredDomTags={ignoredDomTags}
        // @ts-ignore
        ignoredStyles={ignoredStyles}
      >
        <RenderHTMLConfigProvider renderers={renderers}>
          <NeoNamuRenderHTML html={result} />
        </RenderHTMLConfigProvider>
      </TRenderEngineProvider>
    </View>
  );
}

export default React.memo(Result);
