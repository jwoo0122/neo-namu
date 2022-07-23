import { useEffect, useRef } from "react";
import { WebView } from "react-native-webview";
import { WebViewMessageEvent } from "react-native-webview/lib/WebViewTypes";
import { useResultHandler, useSearchKeyword } from "../hooks/useSearch";

const NAMU_WIKI = "https://namu.wiki";

const NEO_NAMU_BRIDGE = `
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
        window.ReactNativeWebView.postMessage(document.getElementsByTagName('h1')[0].parentNode.innerHTML);
      };
    });
  };
})()
`;

export function NamuWiki() {
  const keyword = useSearchKeyword();
  const setResult = useResultHandler();

  const namuWikiRef = useRef<WebView | null>(null);

  const handleSuccess = ({ nativeEvent: { data } }: WebViewMessageEvent) => {
    setResult(data);
  };

  const handleLoadDone = () =>
    namuWikiRef.current.postMessage(`{ "from": "neo-namu-done" }`);

  useEffect(() => {
    namuWikiRef.current?.postMessage(
      `{ "from": "neo-namu-search", "keyword": "${keyword}" }`
    );
  }, [keyword]);

  return (
    <WebView
      ref={namuWikiRef}
      source={{ uri: NAMU_WIKI }}
      style={{ width: "100%" }}
      onMessage={handleSuccess}
      onLoad={handleLoadDone}
      injectedJavaScript={NEO_NAMU_BRIDGE}
    />
  );
}
