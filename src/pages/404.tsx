import Head from "next/head";
import { Link } from "src/components/common/link";

const Page = () => (
  <>
    <Head>
      <title>404 - MrCai</title>
    </Head>
    <main className="flex flex-col items-center gap-y-4 m-auto translate-y-16">
      <h1 className="text-7xl sm:text-8xl lg:text-9xl font-black transition-colors">
        404
      </h1>
      <p className="text-lg sm:text-xl lg:text-2xl transition-colors">
        Oops! This page does not exist!
      </p>
      <Link href="/" className="ghost px-4">
        Back to home
      </Link>
    </main>
  </>
);

export default Page;
