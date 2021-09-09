import { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import "tailwindcss/tailwind.css";
import Main from "../layouts/Main";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Main>
        <Component {...pageProps} />
      </Main>
    </QueryClientProvider>
  );
}

export default MyApp;
