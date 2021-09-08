import { AppProps } from "next/app";
import "tailwindcss/tailwind.css";
import Main from "../layouts/main";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Main>
      <Component {...pageProps} />
    </Main>
  );
}

export default MyApp;
