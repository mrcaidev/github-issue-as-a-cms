import { LazyMotion } from "framer-motion";
import { type AppProps } from "next/app";
import "src/styles/globals.css";

const features = () => import("framer-motion").then((mod) => mod.domAnimation);

const App = ({ Component, pageProps }: AppProps) => (
  <LazyMotion features={features} strict>
    <Component {...pageProps} />
  </LazyMotion>
);

export default App;
