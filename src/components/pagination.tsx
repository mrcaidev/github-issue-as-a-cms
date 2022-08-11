import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { ArrowLink } from "./arrow-link";
import { Link } from "./common/link";

interface IProps {
  current: number;
  total: number;
}

export const Pagination = ({ current, total }: IProps) =>
  current < 1 || current > total ? (
    <ArrowLink href="/posts" direction="left">
      Back to page 1
    </ArrowLink>
  ) : (
    <div className="flex justify-center items-center gap-x-1 px-4 animate-rise">
      <Link
        href={`/posts?page=${current - 1}`}
        aria-disabled={current <= 1}
        className={`p-2 rounded-md text-dim transition-colors ${
          current <= 1
            ? "pointer-events-none"
            : "bg-ghost hover:text-slate-700 hover:dark:text-slate-300"
        }`}
      >
        <FiChevronLeft size="16px" />
      </Link>
      {current >= 3 && (
        <Link
          href={`/posts`}
          className="px-3 py-1 rounded-md bg-ghost text-dim hover:text-slate-700 hover:dark:text-slate-300 transition-colors"
        >
          1
        </Link>
      )}
      {current >= 4 && (
        <div className="px-3 py-1 rounded-md text-dim cursor-default transition-colors">
          ...
        </div>
      )}
      {current >= 2 && (
        <Link
          href={`/posts?page=${current - 1}`}
          className="px-3 py-1 rounded-md bg-ghost text-dim hover:text-slate-700 hover:dark:text-slate-300 transition-colors"
        >
          {current - 1}
        </Link>
      )}
      <div className="px-3 py-1 rounded-md font-semibold cursor-default transition-colors">
        {current}
      </div>
      {current <= total - 1 && (
        <Link
          href={`/posts?page=${current + 1}`}
          className="px-3 py-1 rounded-md bg-ghost text-dim hover:text-slate-700 hover:dark:text-slate-300 transition-colors"
        >
          {current + 1}
        </Link>
      )}
      {current <= total - 3 && (
        <div className="px-3 py-1 rounded-md text-dim cursor-default transition-colors">
          ...
        </div>
      )}
      {current <= total - 2 && (
        <Link
          href={`/posts/?page=${total}`}
          className="px-3 py-1 rounded-md bg-ghost text-dim hover:text-slate-700 hover:dark:text-slate-300 transition-colors"
        >
          {total}
        </Link>
      )}
      <Link
        href={`/posts?page=${current + 1}`}
        aria-disabled={current >= total}
        className={`p-2 rounded-md text-dim ${
          current >= total
            ? "pointer-events-none"
            : "bg-ghost hover:text-slate-700 hover:dark:text-slate-300 transition-colors"
        }`}
      >
        <FiChevronRight size="16px" />
      </Link>
    </div>
  );
