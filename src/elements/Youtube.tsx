import { useState } from "react";
import { LayoutChangeEvent, View } from "react-native";
import { CustomRendererProps, TBlock } from "react-native-render-html";
import YoutubeIframe from "react-native-youtube-iframe";

interface YoutubeProps extends CustomRendererProps<TBlock> {}

const YOUTUBE_DEFAULT_ASPECT_RATIO = 16 / 9;

export function Youtube({ tnode }: YoutubeProps) {
  const src = tnode.attributes["src"] || "";
  const [parentWidth, setParentWidth] = useState(1);

  const videoIdMatching = src.match(/embed\/([\w+\-+]+)/);

  const handleLayout = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    setParentWidth(width);
  };

  if (!src.startsWith("https://www.youtube.com") || videoIdMatching == null) {
    return null;
  }

  return (
    <View
      style={{ width: "100%", aspectRatio: YOUTUBE_DEFAULT_ASPECT_RATIO }}
      onLayout={handleLayout}
    >
      <YoutubeIframe
        height={parentWidth / YOUTUBE_DEFAULT_ASPECT_RATIO}
        videoId={videoIdMatching[1]}
        webViewStyle={{
          borderRadius: 10,
        }}
        webViewProps={{
          injectedJavaScript: `
            var element = document.getElementsByClassName('container')[0];
            element.style.position = 'unset';
            true;
          `,
        }}
      />
    </View>
  );
}
