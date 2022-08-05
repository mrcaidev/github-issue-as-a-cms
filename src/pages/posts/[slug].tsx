import { type GetStaticPaths, type GetStaticProps } from "next";
import { useMemo } from "react";
import { formatTime } from "src/utils/datetime";
import { parseMd } from "src/utils/markdown";
import { getAllSlugs, getPostBySlug, type IPost } from "src/utils/post";

const Page = ({ title, description, topic, createdAt, content }: IPost) => {
  const html = useMemo(() => ({ __html: parseMd(content) }), [content]);

  return (
    <main>
      <h1>{title}</h1>
      <p>{description}</p>
      <p>{topic}</p>
      <time dateTime={createdAt}>{formatTime(createdAt)}</time>
      <article dangerouslySetInnerHTML={html} />
    </main>
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
