import { m, type Variants } from "framer-motion";
import { type IPostOutline } from "src/utils/post";
import { Link } from "./common/link";
import { PostCard } from "./post-card";

const slide: Variants = {
  hide: {
    x: -30,
    opacity: 0,
  },
  show: {
    x: 0,
    opacity: 1,
    transition: { type: "tween", duration: 0.5 },
  },
};

interface IProps {
  outlines: IPostOutline[];
}

export const LatestPosts = ({ outlines }: IProps) => (
  <section className="max-w-5xl px-12 sm:px-24 py-16 mx-auto">
    <h2 className="relative w-fit pb-4 text-2xl sm:text-3xl font-semibold transition-colors">
      Latest
      <div className="absolute w-[150%] h-0.5 rounded-full bg-sky-800 dark:bg-sky-200 transition-bg" />
    </h2>
    <div className="flex flex-col items-center divide-y divide-slate-300 dark:divide-slate-700">
      {outlines.map((outline) => (
        <PostCard key={outline.path} {...outline} />
      ))}
    </div>
    <m.div
      variants={slide}
      viewport={{ once: true }}
      initial="hide"
      whileInView="show"
      className="py-2 text-center"
    >
      <Link
        href="/posts"
        className="px-4 py-2 hover:text-sky-800 hover:dark:text-sky-200 transition-colors"
      >
        All Posts 》
      </Link>
    </m.div>
  </section>
);
