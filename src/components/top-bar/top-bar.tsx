import Image from "next/image";
import logo from "public/logo.svg";
import { Link } from "../common/link";
import { GithubLink } from "./github-link";
import { NavigationLinks } from "./navigation-links";
import { SideMenu } from "./side-menu";
import { ThemeToggler } from "./theme-toggler";

export const TopBar = () => (
  <header className="flex justify-between items-center fixed top-0 left-0 right-0 px-8 py-4 bg-slate-100 dark:bg-slate-900 shadow-lg transition-bg z-10">
    <div className="flex items-center gap-x-1">
      <Image src={logo} alt="Logo" width="28px" height="48px" />
      <Link
        href="/"
        className="px-2 py-1 font-black text-3xl transition-colors"
      >
        MRCAI
      </Link>
    </div>
    <nav className="hidden md:flex gap-x-1 px-4">
      <NavigationLinks />
    </nav>
    <div className="hidden md:block grow" />
    <div className="hidden md:flex gap-x-1">
      <GithubLink />
      <ThemeToggler />
    </div>
    <div className="block md:hidden">
      <SideMenu />
    </div>
  </header>
);
