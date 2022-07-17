(() => {
  if (window.ReactNativeWebView) {
    window.addEventListener("message", (event) => {
      if (event.data && event.data.includes("neo-namu")) {
        const { keyword } = JSON.parse(event.data);
        const inputEl = document.getElementsByTagName("input")[0];
        inputEl.value = keyword;
        inputEl.dispatchEvent(new Event("input"));
        const searchButtonEl =
          inputEl.parentNode.nextElementSibling.children[1];
        searchButtonEl.dispatchEvent(new Event("click"));
      }
    });

    window.addEventListener("load", () => {
      if (window.location.href.includes("/w/")) {
        window.ReactNativeWebView.postMessage(
          document.getElementsByTagName("html")[0].innerHTML
        );
      }
    });
  }
})();
