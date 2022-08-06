import { type GetStaticProps } from "next";
import Head from "next/head";
import { FiArrowRight } from "react-icons/fi";
import { Link } from "src/components/common/link";
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
    <main>
      <Hero />
      <section className="max-w-5xl px-12 sm:px-24 py-8 mx-auto">
        <Title>Latest</Title>
        <PostStack outlines={outlines} />
        <div className="py-8 text-center">
          <Link href="/posts" className="px-4 py-2 rounded-md bg-ghost">
            All Posts&nbsp;
            <FiArrowRight className="inline-block w-5 -translate-y-0.5" />
          </Link>
        </div>
      </section>
    </main>
  </>
);

export default Page;

export const getStaticProps: GetStaticProps<IProps> = async () => {
  const posts = await getAllPosts();
  const outlines = posts.slice(0, 5).map(getOutline);
  return { props: { outlines } };
};
