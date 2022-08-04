import { AnimatePresence, m, type Variants } from "framer-motion";
import { type PropsWithChildren } from "react";

const fadeInOut: Variants = {
  hide: {
    opacity: 0,
  },
  show: {
    opacity: 0.6,
    transition: { duration: 0.1 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.1 },
  },
};

const slide: Variants = {
  hide: {
    x: 200,
  },
  show: {
    x: 0,
    transition: { duration: 0.1 },
  },
  exit: {
    x: 200,
    transition: { duration: 0.1 },
  },
};

interface IProps extends PropsWithChildren {
  show: boolean;
}

export const SideMenuContainer = ({ show, children }: IProps) => (
  <AnimatePresence>
    {show && (
      <>
        <m.div
          variants={fadeInOut}
          initial="hide"
          animate="show"
          exit="exit"
          className="fixed top-0 left-0 w-screen h-screen bg-slate-800 z-20"
        />
        <m.div
          role="dialog"
          aria-label="Sidebar menu"
          variants={slide}
          initial="hide"
          whileInView="show"
          exit="exit"
          className="flex flex-col justify-between items-center fixed top-0 right-0 h-screen px-8 py-4 rounded-l-2xl bg-slate-100 dark:bg-slate-900 shadow-2xl transition-bg z-30"
        >
          {children}
        </m.div>
      </>
    )}
  </AnimatePresence>
);
