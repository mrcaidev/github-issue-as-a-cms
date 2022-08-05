import "@fontsource/inter/400.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/inter/800.css";
import "@fontsource/inter/900.css";
import { LazyMotion } from "framer-motion";
import { type AppProps } from "next/app";
import TopBar from "src/components/top-bar";
import { ThemeProvider } from "src/contexts/theme.context";
import "src/styles/globals.css";

const features = () => import("framer-motion").then((mod) => mod.domAnimation);

const App = ({ Component, pageProps }: AppProps) => (
  <LazyMotion features={features} strict>
    <ThemeProvider>
      <TopBar />
      <Component {...pageProps} />
    </ThemeProvider>
  </LazyMotion>
);

export default App;
