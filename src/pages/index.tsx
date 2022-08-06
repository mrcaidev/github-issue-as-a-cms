import { type GetStaticProps } from "next";
import Head from "next/head";
import { FiArrowRight } from "react-icons/fi";
import { Link } from "src/components/common/link";
import { Title } from "src/components/common/title";
import { Hero } from "src/components/hero";
import { PostCard } from "src/components/post-card";
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
        <div className="flex flex-col items-center divide-y divide-slate-300 dark:divide-slate-700">
          {outlines.map((outline) => (
            <PostCard key={outline.slug} {...outline} />
          ))}
        </div>
        <div className="py-8 text-center">
          <Link href="/posts" className="px-4 py-2 rounded-md bg-ghost">
            All Posts{" "}
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
