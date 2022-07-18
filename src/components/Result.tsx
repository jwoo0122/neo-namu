import { useWindowDimensions } from "react-native";
import RenderHTML, { Element } from "react-native-render-html";

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

interface ResultProps {
  html: string;
}

export function Result({ html }: ResultProps) {
  const dimension = useWindowDimensions();

  return (
    <RenderHTML
      contentWidth={dimension.width}
      source={{ html }}
      // @ts-ignore
      domVisitors={{ onElement }}
      ignoredDomTags={["noscript", "iframe"]}
    />
  );
}
