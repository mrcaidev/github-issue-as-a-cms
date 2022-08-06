import { m } from "framer-motion";
import { type IPostOutline } from "src/utils/post";
import { PostCard } from "./post-card";

interface IProps {
  outlines: IPostOutline[];
}

export const PostStack = ({ outlines }: IProps) => (
  <m.div
    initial="hide"
    whileInView="show"
    transition={{ staggerChildren: 0.2 }}
    className="flex flex-col items-center divide-y divide-slate-300 dark:divide-slate-700"
  >
    {outlines.map((outline) => (
      <PostCard key={outline.slug} {...outline} />
    ))}
  </m.div>
);
