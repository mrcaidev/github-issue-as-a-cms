import { FiBookOpen, FiExternalLink } from "react-icons/fi";
import { Link } from "../common/link";

export const Cover = () => (
  <section className="flex flex-col items-center gap-y-6 lg:gap-y-8 pt-36 pb-12 px-8 bg-slate-200 dark:bg-slate-800 shadow-inner transition-bg">
    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-center transition-colors">
      Welcome to Yuwang Cai&apos;s blog!
    </h1>
    <p className="text-slate-600 dark:text-slate-400 text-md sm:text-xl lg:text-2xl text-center transition-colors">
      I share my <strong>webdev</strong> experience here.
    </p>
    <div className="flex flex-wrap-reverse justify-center gap-2 sm:gap-x-8">
      <Link
        href="https://mrcai.space"
        className="px-6 py-3 rounded-lg text-md sm:text-lg hover:text-sky-800 hover:dark:text-sky-200 font-semibold hover:shadow-md transition"
      >
        <FiExternalLink className="inline-block align-middle mr-3 w-5" />
        Homepage
      </Link>
      <Link
        href="/posts"
        className="px-6 py-3 rounded-lg bg-sky-200 dark:bg-sky-800 hover:brightness-95 active:brightness-90 text-md sm:text-lg font-semibold shadow-md transition"
      >
        <FiBookOpen className="inline-block align-middle mr-3 w-5" />
        All Posts
      </Link>
    </div>
  </section>
);
