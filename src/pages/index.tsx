import { GetStaticProps } from "next";
import Head from "next/head";
import Cover from "src/components/cover";
import { getAllPosts } from "src/utils/post";

const Page = () => (
  <>
    <Head>
      <title>Blog - MrCai</title>
    </Head>
    <main>
      <Cover />
    </main>
  </>
);

export default Page;

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getAllPosts();
  return { props: { posts } };
};
