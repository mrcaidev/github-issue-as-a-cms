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
          className={`px-4 py-2 rounded-md bg-ghost font-semibold text-lg text-link text-center ${
            pathname.startsWith(href)
              ? "text-sky-800 dark:text-sky-200"
              : "text-dim"
          }`}
        >
          {name}
        </Link>
      ))}
    </>
  );
};
