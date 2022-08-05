import Head from "next/head";
import { Link } from "src/components/common/link";

const Page = () => (
  <>
    <Head>
      <title>404 - MrCai</title>
    </Head>
    <main className="flex flex-col items-center gap-y-4 px-8 py-16 sm:pt-32">
      <h1 className="font-black text-7xl sm:text-9xl text-center transition-colors">
        404
      </h1>
      <p className="text-lg sm:text-2xl text-center transition-colors">
        Page Not Found
      </p>
      <Link href="/" className="px-4 py-2 rounded-md bg-ghost">
        Back to home
      </Link>
    </main>
  </>
);

export default Page;
