import { m, type Variants } from "framer-motion";
import { formatTime } from "src/utils/datetime";
import { type IPostOutline } from "src/utils/post";
import { Link } from "./common/link";

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

export const PostCard = ({
  slug: path,
  title,
  description,
  topic,
  createdAt,
}: IPostOutline) => (
  <m.div
    variants={slide}
    initial="hide"
    whileInView="show"
    className="w-full py-8 transition-[border]"
  >
    <h3>
      <Link
        href={"/posts/" + path}
        className="py-1 font-bold text-lg sm:text-xl text-link"
      >
        {title}
      </Link>
    </h3>
    <p className="my-3 text-sm sm:text-base text-dim line-clamp-2">
      {description}
    </p>
    <div className="flex justify-between items-center gap-x-4 gap-y-2 flex-wrap">
      <time
        dateTime={createdAt}
        className="font-semibold text-sm sm:text-base text-dim"
      >
        {formatTime(createdAt)}
      </time>
      <Link
        href={"/topics/" + topic}
        className="px-2 py-1 rounded-md bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 hover:dark:bg-slate-700 font-semibold text-sm sm:text-base transition-colors"
      >
        {topic}
      </Link>
    </div>
  </m.div>
);