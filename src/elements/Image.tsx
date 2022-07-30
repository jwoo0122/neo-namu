import { useEffect, useState } from "react";
import { Image as RNImage } from "react-native";
import { CustomRendererProps, TBlock } from "react-native-render-html";

interface ImageProps extends CustomRendererProps<TBlock> {}

export function Image({ tnode }: ImageProps) {
  const [width, setWidth] = useState(1);
  const [height, setHeight] = useState(1);
  const src = tnode.attributes["src"];

  const aspectRatio = width / height;

  useEffect(() => {
    RNImage.getSize(src, (_width, _height) => {
      setWidth(_width);
      setHeight(_height);
    });
  }, []);

  if (!src.startsWith("https")) {
    return null;
  }

  if (width === 0 || height === 0) {
    return null;
  }

  return (
    <RNImage
      source={{
        uri: src,
      }}
      style={{
        width: "100%",
        height: undefined,
        aspectRatio: aspectRatio,
      }}
    />
  );
}
