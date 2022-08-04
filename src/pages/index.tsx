import { GetStaticProps } from "next";
import Head from "next/head";
import { getAllPosts } from "src/utils/post";

const Page = () => (
  <>
    <Head>
      <title>Blog - MrCai</title>
    </Head>
    <main>
      <h1>Index</h1>
    </main>
  </>
);

export default Page;

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getAllPosts();
  return { props: { posts } };
};
