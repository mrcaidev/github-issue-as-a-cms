import { type IPostOutline } from "src/utils/post";
import { PostCard } from "./post-card";

interface IProps {
  outlines: IPostOutline[];
}

export const PostStack = ({ outlines }: IProps) => (
  <div className="flex flex-col items-center divide-y divide-slate-300 dark:divide-slate-700">
    {outlines.map((outline, index) => (
      <PostCard key={outline.slug} index={index} outline={outline} />
    ))}
  </div>
);
