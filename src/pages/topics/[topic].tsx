import { type GetStaticPaths, type GetStaticProps } from "next";
import Head from "next/head";
import { FiArrowLeft } from "react-icons/fi";
import { Link } from "src/components/common/link";
import { Title } from "src/components/common/title";
import { PostStack } from "src/components/post-stack";
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
        <PostStack outlines={outlines} />
        <div className="py-8 text-center animate-rise">
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
