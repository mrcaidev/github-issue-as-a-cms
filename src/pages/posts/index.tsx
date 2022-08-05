import { GetStaticProps } from "next";
import Head from "next/head";
import { Title } from "src/components/common/title";
import { PostCard } from "src/components/post-card";
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
        <div className="flex flex-col items-center divide-y divide-slate-300 dark:divide-slate-700">
          {outlines.map((outline) => (
            <PostCard key={outline.slug} {...outline} />
          ))}
        </div>
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
