import { m, type Variants } from "framer-motion";
import { type GetStaticProps } from "next";
import Head from "next/head";
import { Title } from "src/components/common/title";
import { TopicCard } from "src/components/topic-card";
import { getAllTopics } from "src/utils/post";

const fadeIn: Variants = {
  hide: {
    scale: 0.8,
    opacity: 0,
  },
  show: {
    scale: 1,
    opacity: 1,
    transition: { type: "tween", duration: 0.5 },
  },
};

interface IProps {
  topics: Record<string, number>;
}

const Page = ({ topics }: IProps) => (
  <>
    <Head>
      <title>Topics - MrCai</title>
    </Head>
    <main>
      <section className="max-w-5xl px-12 sm:px-24 py-8 mx-auto">
        <Title>Topics</Title>
        <m.ul
          initial="hide"
          whileInView="show"
          transition={{ staggerChildren: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 py-4"
        >
          {Object.entries(topics).map(([topic, num]) => (
            <m.li variants={fadeIn} key={topic}>
              <TopicCard topic={topic} num={num} />
            </m.li>
          ))}
        </m.ul>
      </section>
    </main>
  </>
);

export default Page;

export const getStaticProps: GetStaticProps = async () => {
  const topics = await getAllTopics();
  return { props: { topics } };
};
