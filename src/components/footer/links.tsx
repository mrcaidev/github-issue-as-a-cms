import navigationLinks from "src/data/navigation-links.json";
import { Link } from "../common/link";
import { Column } from "./column";

export const Links = () => (
  <Column title="LINKS">
    {navigationLinks.map(({ name, href }) => (
      <li key={name}>
        <Link
          href={href}
          className="px-4 py-2 rounded-md hover:bg-slate-100 hover:dark:bg-slate-900 active:bg-slate-200 active:dark:bg-slate-800 transition-colors"
        >
          {name}
        </Link>
      </li>
    ))}
  </Column>
);
