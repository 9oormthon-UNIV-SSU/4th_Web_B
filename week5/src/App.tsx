import { BrowserRouter } from "react-router-dom";
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { APIResponseError } from "endpoint-client";
import MainRouter from "@/route/MainRouter";

function App() {
  const queryClient = new QueryClient({
    queryCache: new QueryCache({
      onError: (error) => {
        if (error instanceof APIResponseError) {
          if (error.body.code === "invalid_token") {
            localStorage.removeItem("accessToken");
            window.location.href = "/";
          }
        }
      },
    }),
    defaultOptions: {
      queries: {
        retry: false,
        staleTime: 1000 * 60 * 5,
      },
    },
  });
  return (
    <BrowserRouter basename={import.meta.env.PUBLIC_URL}>
      <QueryClientProvider client={queryClient}>
        <MainRouter />
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
