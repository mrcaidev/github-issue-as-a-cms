import { FiBookOpen, FiExternalLink } from "react-icons/fi";
import { Link } from "./common/link";

export const Hero = () => (
  <section className="flex flex-col items-center gap-y-6 sm:gap-y-8 lg:gap-y-10 px-8 py-12 sm:py-20 bg-dim shadow-inner">
    <h1 className="font-extrabold text-3xl sm:text-4xl lg:text-5xl text-center">
      Welcome to Yuwang Cai&apos;s blog!
    </h1>
    <p className="text-base sm:text-xl lg:text-2xl text-dim text-center">
      I share my&nbsp;
      <strong className="text-highlight">webdev</strong>
      &nbsp;experience here.
    </p>
    <div className="flex justify-center gap-2 flex-wrap-reverse sm:gap-x-8">
      <Link
        href="https://mrcai.space"
        className="flex gap-x-3 items-center px-6 py-3 rounded-lg font-semibold text-base sm:text-lg hover:text-highlight hover:shadow-md transition-shadow"
      >
        <FiExternalLink />
        Homepage
      </Link>
      <Link
        href="/posts"
        className="flex gap-x-3 items-center px-6 py-3 rounded-lg bg-highlight font-semibold text-base sm:text-lg hover:brightness-95 shadow-md transition-[filter]"
      >
        <FiBookOpen />
        All Posts
      </Link>
    </div>
  </section>
);
