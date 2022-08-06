import { GetStaticProps } from "next";
import Head from "next/head";
import { Title } from "src/components/common/title";
import { PostStack } from "src/components/post-stack";
import { getAllPosts, getOutline, IPostOutline } from "src/utils/post";

interface IProps {
  outlines: IPostOutline[];
}

const Page = ({ outlines }: IProps) => (
  <>
    <Head>
      <title>Posts - MrCai</title>
    </Head>
    <main>
      <section className="max-w-5xl px-12 sm:px-24 py-8 mx-auto">
        <Title>Posts</Title>
        <PostStack outlines={outlines} />
      </section>
    </main>
  </>
);

export default Page;

export const getStaticProps: GetStaticProps<IProps> = async () => {
  const posts = await getAllPosts();
  const outlines = posts.map(getOutline);
  return { props: { outlines } };
};
