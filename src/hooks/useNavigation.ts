import { useHistory } from "./useHistory";
import { useNavigator } from "./useNavigator";
import { useSearch } from "./useSearch";

export function useNavigation() {
  const [history] = useHistory();
  const search = useSearch();
  const [navigator, setNavigator] = useNavigator();

  const canGoBack = navigator < history.length - 1;
  const canGoForward = navigator > 0;

  const goBack = () => {
    if (canGoBack) {
      const newNavigator = navigator + 1;
      setNavigator(newNavigator);
      search(history[newNavigator]);
    }
  };

  const goForward = () => {
    if (canGoForward) {
      const newNavigator = navigator - 1;
      setNavigator(newNavigator);
      search(history[newNavigator]);
    }
  };

  const goRecent = () => {
    setNavigator(0);
  };

  return { canGoBack, canGoForward, goBack, goForward, goRecent };
}
