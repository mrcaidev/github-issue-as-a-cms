import navigationLinks from "src/data/navigation-links.json";
import { Link } from "../common/link";

export const NavigationLinks = () => (
  <>
    {Object.entries(navigationLinks).map(([id, { name, href }]) => (
      <Link
        key={id}
        href={href}
        className="px-4 py-2 text-slate-600 dark:text-slate-400 hover:text-sky-600 hover:dark:text-sky-400 active:text-sky-500 active:dark:text-sky-500 text-lg text-center font-semibold transition-colors"
      >
        {name}
      </Link>
    ))}
  </>
);
