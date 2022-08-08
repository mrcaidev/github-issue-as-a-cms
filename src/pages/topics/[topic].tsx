import { type GetStaticPaths, type GetStaticProps } from "next";
import Head from "next/head";
import { ArrowLink } from "src/components/arrow-link";
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
    <main className="w-full">
      <section className="max-w-5xl px-12 sm:px-24 py-8 mx-auto">
        <Title>
          Topic - <span className="italic">{topic}</span>
        </Title>
        <PostStack outlines={outlines} />
        <ArrowLink href="/topics" direction="left">
          Back to topics
        </ArrowLink>
      </section>
    </main>
  </>
);

export default Page;

export const getStaticPaths: GetStaticPaths = async () => {
  const topics = getAllTopics();
  const paths = Object.keys(topics).map((topic) => ({ params: { topic } }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<IProps> = async (context) => {
  const topic = context.params?.topic;
  if (typeof topic !== "string") return { notFound: true };

  const posts = getPostsByTopic(topic);
  const outlines = posts.map(getOutline);
  return { props: { topic, outlines } };
};
