import { Link } from "./common/link";

interface IProps {
  topic: string;
}

export const TopicTag = ({ topic }: IProps) => (
  <Link
    href={"/topics/" + topic}
    className="px-2 py-1 rounded-md bg-dim hover:bg-slate-300 hover:dark:bg-slate-700 font-semibold text-sm sm:text-base"
  >
    {topic}
  </Link>
);
