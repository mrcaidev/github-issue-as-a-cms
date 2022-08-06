import "@fontsource/inter/400.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/inter/800.css";
import "@fontsource/inter/900.css";
import { LazyMotion } from "framer-motion";
import { type AppProps } from "next/app";
import dynamic from "next/dynamic";
import { TopBar } from "src/components/top-bar";
import { ThemeProvider } from "src/contexts/theme.context";
import "src/styles/globals.css";
import "src/styles/one-dark.css";

const features = () => import("framer-motion").then((mod) => mod.domAnimation);
const Footer = dynamic(() => import("src/components/footer"));

const App = ({ Component, pageProps }: AppProps) => (
  <LazyMotion features={features} strict>
    <ThemeProvider>
      <div className="flex flex-col min-h-screen">
        <TopBar />
        <div className="grow mt-20">
          <Component {...pageProps} />
        </div>
        <Footer />
      </div>
    </ThemeProvider>
  </LazyMotion>
);

export default App;
