import "@fontsource/inter/400.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/inter/800.css";
import "@fontsource/inter/900.css";
import { type AppProps } from "next/app";
import dynamic from "next/dynamic";
import { TopBar } from "src/components/top-bar";
import { ThemeProvider } from "src/contexts/theme.context";
import { usePageLoading } from "src/hooks/use-page-loading";
import "src/styles/globals.css";
import "src/styles/one-dark.css";

const Loading = dynamic(() => import("src/components/loading"));
const Footer = dynamic(() => import("src/components/footer"));

const App = ({ Component, pageProps }: AppProps) => {
  const isLoading = usePageLoading();

  return (
    <ThemeProvider>
      <div className="flex flex-col min-h-screen">
        <TopBar />
        <div className="grow flex mt-20">
          {isLoading ? <Loading /> : <Component {...pageProps} />}
        </div>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default App;
