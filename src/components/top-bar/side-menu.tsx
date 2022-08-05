import { useBoolean, useFocusTrap, useKeydown } from "@mrcaidev/hooks";
import { AnimatePresence, m, type Variants } from "framer-motion";
import { useRef, type PropsWithChildren } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { GithubLink } from "./github-link";
import { NavigationLinks } from "./navigation-links";
import { ThemeToggler } from "./theme-toggler";

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
          animate="show"
          exit="exit"
          className="flex flex-col justify-between items-center fixed top-0 right-0 h-screen px-8 py-5 rounded-l-2xl bg-slate-100 dark:bg-slate-900 shadow-2xl transition-bg z-30"
        >
          {children}
        </m.div>
      </>
    )}
  </AnimatePresence>
);

export const SideMenu = () => {
  const { value: shouldShow, on: showModal, off: hideModal } = useBoolean();

  const firstRef = useRef<HTMLButtonElement>(null);
  const lastRef = useRef<HTMLButtonElement>(null);
  useFocusTrap(firstRef, lastRef);

  useKeydown("Escape", hideModal);

  return (
    <>
      <button
        onClick={showModal}
        aria-label="Open sidebar menu"
        className="p-2 rounded-md bg-ghost"
      >
        <FiMenu size="24px" />
      </button>
      <SideMenuContainer show={shouldShow}>
        <div className="self-end">
          <button
            ref={firstRef}
            onClick={hideModal}
            aria-label="Close sidebar menu"
            className="p-2 rounded-md bg-ghost"
          >
            <FiX size="24px" />
          </button>
        </div>
        <nav className="grow flex flex-col justify-center gap-y-2">
          <NavigationLinks />
        </nav>
        <div className="flex gap-x-4 px-8">
          <GithubLink />
          <ThemeToggler ref={lastRef} />
        </div>
      </SideMenuContainer>
    </>
  );
};
