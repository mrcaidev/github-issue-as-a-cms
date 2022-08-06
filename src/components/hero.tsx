import { FiBookOpen, FiExternalLink } from "react-icons/fi";
import { Link } from "./common/link";

export const Hero = () => (
  <section className="flex flex-col items-center gap-y-6 sm:gap-y-8 lg:gap-y-10 px-8 py-12 sm:py-20 bg-slate-200 dark:bg-slate-800 shadow-inner transition-bg">
    <h1 className="font-extrabold text-3xl sm:text-4xl lg:text-5xl text-center transition-colors">
      Welcome to Yuwang Cai&apos;s blog!
    </h1>
    <p className="text-base sm:text-xl lg:text-2xl text-dim text-center">
      I share my&nbsp;
      <strong className="text-sky-800 dark:text-sky-200 transition-colors">
        webdev
      </strong>
      &nbsp;experience here.
    </p>
    <div className="flex justify-center gap-2 flex-wrap-reverse sm:gap-x-8">
      <Link
        href="https://mrcai.space"
        className="px-6 py-3 rounded-lg font-semibold text-base sm:text-lg text-link hover:shadow-md transition"
      >
        <FiExternalLink className="inline-block mr-3 w-5 -translate-y-0.5" />
        Homepage
      </Link>
      <Link
        href="/posts"
        className="px-6 py-3 rounded-lg bg-sky-200 dark:bg-sky-800 hover:brightness-95 active:brightness-90 font-semibold text-base sm:text-lg shadow-md transition"
      >
        <FiBookOpen className="inline-block mr-3 w-5 -translate-y-0.5" />
        All Posts
      </Link>
    </div>
  </section>
);
