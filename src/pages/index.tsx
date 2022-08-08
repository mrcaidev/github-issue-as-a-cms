import { type GetStaticProps } from "next";
import Head from "next/head";
import { ArrowLink } from "src/components/arrow-link";
import { Title } from "src/components/common/title";
import { Hero } from "src/components/hero";
import { PostStack } from "src/components/post-stack";
import { getAllPosts, getOutline, type IPostOutline } from "src/utils/post";

interface IProps {
  outlines: IPostOutline[];
}

const Page = ({ outlines }: IProps) => (
  <>
    <Head>
      <title>Blog - MrCai</title>
    </Head>
    <main className="w-full">
      <Hero />
      <section className="max-w-5xl px-12 sm:px-24 py-8 mx-auto">
        <Title>Latest</Title>
        <PostStack outlines={outlines} />
        <ArrowLink href="/posts">All Posts</ArrowLink>
      </section>
    </main>
  </>
);

export default Page;

export const getStaticProps: GetStaticProps<IProps> = async () => {
  const posts = getAllPosts();
  const outlines = posts.slice(0, 5).map(getOutline);
  return { props: { outlines } };
};
