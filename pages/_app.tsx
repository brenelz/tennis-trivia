import "tailwindcss/tailwind.css";
import Main from "../layouts/main";

function MyApp({ Component, pageProps }) {
  return (
    <Main>
      <Component {...pageProps} />
    </Main>
  );
}

export default MyApp;
