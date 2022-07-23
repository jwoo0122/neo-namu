import { useEffect, useRef } from "react";
import { WebView } from "react-native-webview";
import { WebViewMessageEvent } from "react-native-webview/lib/WebViewTypes";
import {
  useIsLoading,
  useResultHandler,
  useSearchKeyword,
  useSuggestionHandler,
} from "../hooks/useSearch";

const NAMU_WIKI = "https://namu.wiki";

const NEO_NAMU_BRIDGE = `
(() => {
  if (window.ReactNativeWebView) {
    const RN = window.ReactNativeWebView
    
    window.addEventListener("load", () => {
      const inputEl = document.getElementsByTagName("input")[0];
      
      const suggestionObserver = new MutationObserver(() => {
        const suggestions = Array.from(inputEl.parentNode.children[1].children).map(_div => _div.children[0].innerHTML)
        RN.postMessage('{ "type": "suggestion", "value": "' + suggestions +  '" }');
      })
      
      suggestionObserver.observe(inputEl.parentNode, { childList: true, subtree: true, characterData: true })
    })

    
    window.addEventListener("message", (event) => {
      const { keyword, type } = JSON.parse(event.data);
      const inputEl = document.getElementsByTagName("input")[0];
      const searchButtonEl = inputEl.parentNode.nextElementSibling.children[1];
      
      if (type === 'neo-namu-type') {
        inputEl.value = keyword;
        inputEl.dispatchEvent(new Event('input'));
      }
      
      if (type === 'neo-namu-search') {
        searchButtonEl.dispatchEvent(new Event('click'));
      }

      if (type === 'neo-namu-done') {
        const resultValue = document.getElementsByTagName('h1')[0].parentNode.innerHTML.replaceAll('"', "'")
        RN.postMessage('{ "type": "done", "value": "' + resultValue + '" }');
      };
    });
  };
})()
`;

export function NamuWiki() {
  const keyword = useSearchKeyword();
  const isLoading = useIsLoading();
  const setResult = useResultHandler();
  const setSuggestion = useSuggestionHandler();

  const namuWikiRef = useRef<WebView | null>(null);

  const handleMessage = ({ nativeEvent: { data } }: WebViewMessageEvent) => {
    const parsedData: { type: string; value: any } = JSON.parse(data);

    if (parsedData.type === "done") {
      setResult(parsedData.value);
    } else if (parsedData.type === "suggestion") {
      setSuggestion(parsedData.value.split(","));
    }
  };

  const handleLoadDone = () =>
    namuWikiRef.current.postMessage(`{ "type": "neo-namu-done" }`);

  useEffect(() => {
    namuWikiRef.current?.postMessage(
      `{ "type": "neo-namu-type", "keyword": "${keyword}" }`
    );
  }, [keyword]);

  useEffect(() => {
    if (isLoading) {
      namuWikiRef.current?.postMessage(`{ "type": "neo-namu-search" }`);
    }
  }, [isLoading]);

  return (
    <WebView
      ref={namuWikiRef}
      source={{ uri: NAMU_WIKI }}
      style={{ width: "100%" }}
      onMessage={handleMessage}
      onLoad={handleLoadDone}
      injectedJavaScript={NEO_NAMU_BRIDGE}
    />
  );
}
