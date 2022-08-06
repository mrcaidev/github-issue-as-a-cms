import { Link } from "./common/link";

interface IProps {
  topic: string;
  num: number;
}

export const TopicCard = ({ topic, num }: IProps) => (
  <div className="flex justify-between items-center gap-x-4 relative px-6 py-4 rounded-md bg-slate-200 dark:bg-slate-800 shadow-md hover:shadow-lg transition-[background-color,box-shadow]">
    <h2>
      <Link
        href={"/topics/" + topic}
        className="px-2 py-1 font-bold text-lg sm:text-2xl text-link before:absolute before:top-0 before:left-0 before:right-0 before:bottom-0"
      >
        {topic}
      </Link>
    </h2>
    <p className="text-base sm:text-lg text-dim">
      {num}
      <span className="hidden sm:inline"> Posts</span>
    </p>
  </div>
);
