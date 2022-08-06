import { m, type Variants } from "framer-motion";
import { type PropsWithChildren } from "react";

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

export const Title = ({ children }: PropsWithChildren) => (
  <m.h2
    variants={slide}
    initial="hide"
    whileInView="show"
    className="relative w-fit my-8 text-3xl font-bold transition-colors"
  >
    {children}
    <span className="absolute left-0 -bottom-1 w-[150%] h-0.5 rounded-full bg-sky-800 dark:bg-sky-200 transition-bg" />
  </m.h2>
);
