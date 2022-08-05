import { GetStaticProps } from "next";
import Head from "next/head";
import { Cover } from "src/components/cover";
import { LatestPosts } from "src/components/latest-posts";
import { getAllPosts, getPostOutline, type IPostOutline } from "src/utils/post";

interface IProps {
  outlines: IPostOutline[];
}

const Page = ({ outlines }: IProps) => (
  <>
    <Head>
      <title>Blog - MrCai</title>
    </Head>
    <main className="w-full">
      <Cover />
      <LatestPosts outlines={outlines} />
    </main>
  </>
);

export default Page;

export const getStaticProps: GetStaticProps<IProps> = async () => {
  const posts = await getAllPosts();
  const outlines = posts.slice(0, 5).map(getPostOutline);
  return { props: { outlines } };
};
