import { type GetStaticPaths, type GetStaticProps } from "next";
import Head from "next/head";
import { useMemo } from "react";
import { TopicTag } from "src/components/topic-tag";
import { formatTime } from "src/utils/datetime";
import { parseMd } from "src/utils/markdown";
import { getAllSlugs, getPostBySlug, type IPost } from "src/utils/post";

const Page = ({ title, description, topic, createdAt, content }: IPost) => {
  const html = useMemo(() => ({ __html: parseMd(content) }), [content]);

  return (
    <>
      <Head>
        <title>{title} - MrCai</title>
      </Head>
      <main>
        <section className="flex flex-col items-center gap-y-6 sm:gap-y-8 lg:gap-y-10 px-8 py-12 sm:py-20 bg-slate-200 dark:bg-slate-800 shadow-inner transition-bg">
          <h1 className="font-bold text-3xl sm:text-4xl lg:text-5xl text-center transition-colors">
            {title}
          </h1>
          <p className="text-base text-dim text-center">{description}</p>
        </section>
        <section className="max-w-5xl px-12 sm:px-24 py-8 mx-auto">
          <article dangerouslySetInnerHTML={html} className="article" />
          <hr className="border-slate-300 dark:border-slate-700 transition-[border]" />
          <div className="flex justify-between items-center py-8">
            <TopicTag topic={topic} />
            <time
              dateTime={createdAt}
              className="font-semibold text-sm sm:text-base text-dim"
            >
              {formatTime(createdAt)}
            </time>
          </div>
        </section>
      </main>
    </>
  );
};

export default Page;

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = await getAllSlugs();
  const paths = slugs.map((slug) => ({ params: { slug } }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const slug = context.params?.slug;
  if (typeof slug !== "string") return { notFound: true };

  const post = await getPostBySlug(slug);
  return { props: post };
};
