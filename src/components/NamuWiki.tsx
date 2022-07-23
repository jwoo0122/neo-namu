import { useEffect, useRef } from "react";
import { WebView } from "react-native-webview";
import { WebViewMessageEvent } from "react-native-webview/lib/WebViewTypes";
import {
  useIsLoading,
  useKeyword,
  useResult,
  useSuggestion,
} from "../hooks/useSearch";

const NAMU_WIKI = "https://namu.wiki";

const NEO_NAMU_BRIDGE = `
(() => {
  if (window.ReactNativeWebView) {
    const RN = window.ReactNativeWebView
    
    window.addEventListener("load", () => {
      const inputEl = document.getElementsByTagName("input")[0];
      
      const suggestionObserver = new MutationObserver(() => {
        const suggestionNode = inputEl.parentNode.children[1]
        if (suggestionNode) {
          const suggestions = Array.from(suggestionNode.children).map(_div => _div.children[0].innerHTML)
          RN.postMessage('suggestion-result:' + suggestions);
        }
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
        const resultValue = document.getElementsByTagName('h1')[0].parentNode.innerHTML
        RN.postMessage('html-result:' + resultValue);
      };
    });
  };
})()
`;

export function NamuWiki() {
  const [keyword] = useKeyword();
  const [isLoading, setIsLoading] = useIsLoading();
  const [, setResult] = useResult();
  const [, setSuggestion] = useSuggestion();

  const namuWikiRef = useRef<WebView | null>(null);

  const handleMessage = ({ nativeEvent: { data } }: WebViewMessageEvent) => {
    if (data.startsWith("html-result")) {
      setIsLoading(false);
      setResult(data.replace(/^html-result:/g, ""));
    } else if (data.startsWith("suggestion-result")) {
      setSuggestion(
        data
          .replace(/^suggestion-result:/g, "")
          .split(",")
          .slice(0, 5)
          .reverse()
      );
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
