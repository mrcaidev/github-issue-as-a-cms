import { useRouter } from "next/router";
import navigationLinks from "src/data/navigation-links.json";
import { Link } from "../common/link";

export const NavigationLinks = () => {
  const { pathname } = useRouter();

  return (
    <>
      {navigationLinks.map(({ name, href }) => (
        <Link
          key={name}
          href={href}
          className={`ghost px-4 text-lg text-center font-semibold hover:text-slate-700 hover:dark:text-slate-300 ${
            pathname.startsWith(href)
              ? ""
              : "text-slate-600 dark:text-slate-400"
          }`}
        >
          {name}
        </Link>
      ))}
    </>
  );
};
