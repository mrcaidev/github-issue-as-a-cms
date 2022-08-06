import { type GetStaticProps } from "next";
import Head from "next/head";
import { Title } from "src/components/common/title";
import { TopicCard } from "src/components/topic-card";
import { getAllTopics } from "src/utils/post";

interface IProps {
  topics: Record<string, number>;
}

const Page = ({ topics }: IProps) => (
  <>
    <Head>
      <title>Topics - MrCai</title>
    </Head>
    <main className="w-full">
      <section className="max-w-5xl px-12 sm:px-24 py-8 mx-auto">
        <Title>Topics</Title>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 py-4">
          {Object.entries(topics).map(([topic, num], index) => (
            <li key={topic}>
              <TopicCard index={index} topic={topic} num={num} />
            </li>
          ))}
        </ul>
      </section>
    </main>
  </>
);

export default Page;

export const getStaticProps: GetStaticProps = async () => {
  const topics = await getAllTopics();
  return { props: { topics } };
};
