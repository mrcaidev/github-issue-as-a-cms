import { GithubLink } from "./github-link";
import { Logo } from "./logo";
import { NavigationLinks } from "./navigation-links";
import { SideMenu } from "./side-menu";
import { ThemeToggler } from "./theme-toggler";

export const TopBar = () => (
  <header className="flex justify-between items-center fixed top-0 left-0 right-0 px-8 py-4 bg-slate-100 dark:bg-slate-900 transition-bg z-10">
    <Logo />
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
