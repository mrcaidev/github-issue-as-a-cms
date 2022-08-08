import { type GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { Title } from "src/components/common/title";
import { Pagination } from "src/components/pagination";
import { PostStack } from "src/components/post-stack";
import { getPageFromQuery } from "src/utils/misc";
import { getAllPosts, getOutline, type IPostOutline } from "src/utils/post";

interface IProps {
  totalPages: number;
  outlines: IPostOutline[];
}

const Page = ({ totalPages, outlines }: IProps) => {
  const { query } = useRouter();
  const page = getPageFromQuery(query);

  return (
    <>
      <Head>
        <title>Posts - MrCai</title>
      </Head>
      <main className="grow flex flex-col w-full">
        <section className="grow max-w-5xl px-12 sm:px-24 py-8 mx-auto">
          <Title>Posts</Title>
          <PostStack outlines={outlines} />
        </section>
        <Pagination current={page} total={totalPages} />
      </main>
    </>
  );
};

export default Page;

const POSTS_PER_PAGE = 5;

export const getServerSideProps: GetServerSideProps<IProps> = async ({
  query,
}) => {
  const page = getPageFromQuery(query);
  const begin = (page - 1) * POSTS_PER_PAGE;

  const posts = getAllPosts();
  const totalPages = ~~(posts.length / POSTS_PER_PAGE) + 1;

  const allOutlines = posts.map(getOutline);
  const outlines = allOutlines.slice(begin, begin + POSTS_PER_PAGE);

  return { props: { outlines, totalPages } };
};
