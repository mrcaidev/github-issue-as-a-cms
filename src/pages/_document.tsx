import { Head, Html, Main, NextScript } from "next/document";

const Document = () => (
  <Html
    lang="en"
    className="scroll-smooth [-webkit-tap-highlight-color:transparent]"
  >
    <Head>
      <meta name="description" content="Yuwang Cai's blog" />
    </Head>
    <body className="bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300">
      <Main />
      <NextScript />
    </body>
  </Html>
);

export default Document;
