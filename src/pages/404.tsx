import Head from "next/head";
import { ArrowLink } from "src/components/arrow-link";

const Page = () => (
  <>
    <Head>
      <title>404 - MrCai</title>
    </Head>
    <main className="flex flex-col justify-center items-center gap-y-4 w-full px-8">
      <h1 className="font-black text-7xl sm:text-9xl text-center transition-colors">
        404
      </h1>
      <p className="text-lg sm:text-2xl text-center transition-colors">
        Page Not Found
      </p>
      <ArrowLink href="/" direction="left">
        Back to home
      </ArrowLink>
    </main>
  </>
);

export default Page;
