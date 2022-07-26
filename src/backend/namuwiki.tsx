import { forwardRef, useRef } from "react";
import { WebView } from "react-native-webview";

interface NamuWikiProps {
  onSuccess: (result: string) => void;
}

export const NamuWiki = forwardRef<{}, NamuWikiProps>((props, ref) => {
  const handleSuccess = (result: string) => {
    props.onSuccess(result);
  };

  const selfRef = useRef<WebView | null>(null);

  return (
    <WebView
      ref={(r) => {
        // @ts-ignore
        ref.current = r;
        selfRef.current = r;
      }}
      source={{ uri: "https://namu.wiki" }}
      style={{ width: "100%" }}
      onMessage={({ nativeEvent: { data } }) => {
        handleSuccess(data);
      }}
      onLoad={() => selfRef.current.postMessage(`{ "from": "neo-namu-done" }`)}
      injectedJavaScript={`
(() => {
  if (window.ReactNativeWebView) {
    window.addEventListener("message", (event) => {
      if (event.data && event.data.includes('neo-namu-search')) {
        const { keyword } = JSON.parse(event.data);
        const inputEl = document.getElementsByTagName("input")[0];
        inputEl.value = keyword;
        inputEl.dispatchEvent(new Event('input'));
        const searchButtonEl = inputEl.parentNode.nextElementSibling.children[1];
        searchButtonEl.dispatchEvent(new Event('click'));
      }

      if (event.data && event.data.includes('neo-namu-done')) {
        window.ReactNativeWebView.postMessage(document.getElementsByTagName('article')[0].innerHTML);
      };
    });
  };
})()
      `}
      {...props}
    />
  );
});
