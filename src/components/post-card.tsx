import { m, type Variants } from "framer-motion";
import { formatTime } from "src/utils/datetime";
import { type IPostOutline } from "src/utils/post";
import { Link } from "./common/link";

const descend: Variants = {
  hide: {
    y: -30,
    opacity: 0,
  },
  show: {
    y: 0,
    opacity: 1,
    transition: { type: "tween", duration: 0.5 },
  },
};

export const PostCard = ({
  path,
  title,
  description,
  topic,
  createdAt,
}: IPostOutline) => (
  <m.div
    variants={descend}
    viewport={{ amount: "all", once: true }}
    initial="hide"
    whileInView="show"
    className="w-full py-8 transition-[border]"
  >
    <h3>
      <Link
        href={"/posts/" + path}
        className="py-1 text-lg sm:text-xl font-bold hover:text-sky-700 hover:dark:text-sky-300 transition-colors"
      >
        {title}
      </Link>
    </h3>
    <p className="my-3 text-sm sm:text-base text-slate-600 dark:text-slate-400 line-clamp-2 transition-colors">
      {description}
    </p>
    <div className="flex justify-between items-center gap-x-4 gap-y-2 flex-wrap">
      <time
        dateTime={createdAt}
        className="text-sm sm:text-base text-slate-600 dark:text-slate-400 font-semibold transition-colors"
      >
        {formatTime(createdAt)}
      </time>
      <Link
        href={"/topics/" + topic}
        className="px-2 py-1 rounded-md bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 hover:dark:bg-slate-700 text-sm sm:text-base font-semibold transition-colors"
      >
        {topic}
      </Link>
    </div>
  </m.div>
);
