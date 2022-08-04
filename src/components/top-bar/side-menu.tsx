import { useBoolean, useFocusTrap, useKeydown } from "@mrcaidev/hooks";
import { useRef } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { IconButton } from "../common/icon-button";
import { GithubLink } from "./github-link";
import { NavigationLinks } from "./navigation-links";
import { SideMenuContainer } from "./side-menu-container";
import { ThemeToggler } from "./theme-toggler";

export const SideMenu = () => {
  const { value: shouldShow, on: showModal, off: hideModal } = useBoolean();

  const firstRef = useRef<HTMLButtonElement>(null);
  const lastRef = useRef<HTMLButtonElement>(null);
  useFocusTrap(firstRef, lastRef);

  useKeydown("Escape", (e) => {
    e.preventDefault();
    hideModal();
  });

  return (
    <>
      <IconButton ariaLabel="Open sidebar menu" onClick={showModal}>
        <FiMenu size="24px" />
      </IconButton>
      <SideMenuContainer show={shouldShow}>
        <div className="self-end">
          <IconButton
            ref={firstRef}
            ariaLabel="Close sidebar menu"
            onClick={hideModal}
          >
            <FiX size="28px" />
          </IconButton>
        </div>
        <nav className="grow flex flex-col justify-center gap-y-2 px-4">
          <NavigationLinks />
        </nav>
        <div className="flex gap-x-4 px-4">
          <GithubLink />
          <ThemeToggler ref={lastRef} />
        </div>
      </SideMenuContainer>
    </>
  );
};
