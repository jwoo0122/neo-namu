import { isDomElement, isDomText, TBlock } from "react-native-render-html";

export function useGetTitle() {
  return (tnode: TBlock) => {
    const targetNode = tnode.domNode.childNodes[2];
    if (isDomElement(targetNode)) {
      return targetNode.children
        .map((node) => {
          if (isDomText(node)) {
            return node.data;
          } else if (isDomElement(node)) {
            if (isDomText(node.childNodes[0])) {
              return node.childNodes[0].data;
            }
          }
        })
        .join("");
    }
    return "";
  };
}
