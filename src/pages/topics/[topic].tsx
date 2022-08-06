import { type GetStaticPaths, type GetStaticProps } from "next";
import Head from "next/head";
import { FiArrowLeft } from "react-icons/fi";
import { Link } from "src/components/common/link";
import { Title } from "src/components/common/title";
import { PostCard } from "src/components/post-card";
import {
  getAllTopics,
  getOutline,
  getPostsByTopic,
  type IPostOutline,
} from "src/utils/post";

interface IProps {
  topic: string;
  outlines: IPostOutline[];
}

const Page = ({ topic, outlines }: IProps) => (
  <>
    <Head>
      <title>{topic + " - MrCai"}</title>
    </Head>
    <main>
      <section className="max-w-5xl px-12 sm:px-24 py-8 mx-auto">
        <Title>
          Topic - <span className="italic">{topic}</span>
        </Title>
        <div className="flex flex-col items-center divide-y divide-slate-300 dark:divide-slate-700">
          {outlines.map((outline) => (
            <PostCard key={outline.slug} {...outline} />
          ))}
        </div>
        <div className="py-8 text-center">
          <Link href="/topics" className="px-4 py-2 rounded-md bg-ghost">
            <FiArrowLeft className="inline-block w-5 -translate-y-0.5" />
            &nbsp;Back to topics
          </Link>
        </div>
      </section>
    </main>
  </>
);

export default Page;

export const getStaticPaths: GetStaticPaths = async () => {
  const topics = await getAllTopics();
  const paths = Object.keys(topics).map((topic) => ({ params: { topic } }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<IProps> = async (context) => {
  const topic = context.params?.topic;
  if (typeof topic !== "string") return { notFound: true };

  const posts = await getPostsByTopic(topic);
  const outlines = posts.map(getOutline);
  return { props: { topic, outlines } };
};
