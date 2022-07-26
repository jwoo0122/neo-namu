import { QueryClient, QueryClientProvider } from "react-query";
import Main from "./src/pages/Main";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Main />
    </QueryClientProvider>
  );
}
