import { useEffect, useState } from "react";
import { Image as RNImage, View } from "react-native";
import { CustomRendererProps, TBlock } from "react-native-render-html";
import { SvgUri, Text } from "react-native-svg";

interface ImageProps extends CustomRendererProps<TBlock> {}

type FETCH_STATUS = "loading" | "svg" | "raster";

export function Image({ tnode }: ImageProps) {
  const [fetchStatus, setFetchStatus] = useState<FETCH_STATUS>("loading");
  const [width, setWidth] = useState(1);
  const [height, setHeight] = useState(1);
  const src = tnode.attributes["src"];

  const aspectRatio = width / height;

  useEffect(() => {
    (async function () {
      try {
        if (src.startsWith("https")) {
          const res = await fetch(src, { method: "HEAD" });

          setFetchStatus(
            res.headers.get("content-type") === "image/svg+xml"
              ? "svg"
              : "raster"
          );
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  useEffect(() => {
    if (fetchStatus === "raster") {
      RNImage.getSize(src, (_width, _height) => {
        setWidth(_width);
        setHeight(_height);
      });
    }
  }, [fetchStatus]);

  if (!src.startsWith("https")) {
    return null;
  }

  if (width === 0 || height === 0) {
    return null;
  }

  if (fetchStatus === "loading") {
    return null;
  }

  return (
    <View style={{ width: "100%", aspectRatio }}>
      {fetchStatus === "svg" ? (
        <>
          <SvgUri uri={src} width="100%" height="100%" fill="black" />
          <Text>{src}</Text>
        </>
      ) : (
        <RNImage
          resizeMode="contain"
          source={{
            uri: src,
          }}
          style={{
            width: "100%",
            height: "100%",
          }}
        />
      )}
    </View>
  );
}
