import { useBoolean, useFocusTrap, useKeydown } from "@mrcaidev/hooks";
import { useRef } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { GithubLink } from "./github-link";
import { NavigationLinks } from "./navigation-links";
import { SideMenuContainer } from "./side-menu-container";
import { ThemeToggler } from "./theme-toggler";

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
        className="ghost"
      >
        <FiMenu size="24px" />
      </button>
      <SideMenuContainer show={shouldShow}>
        <div className="self-end">
          <button
            ref={firstRef}
            onClick={hideModal}
            aria-label="Close sidebar menu"
            className="ghost"
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
