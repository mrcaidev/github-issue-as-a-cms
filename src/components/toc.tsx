import { useBoolean } from "@mrcaidev/hooks";
import { FiChevronsLeft, FiChevronsRight } from "react-icons/fi";
import { type Heading } from "src/utils/markdown";
import { Link } from "./common/link";

interface IProps {
  toc: Heading[];
}

export const TOC = ({ toc }: IProps) => {
  const { value: isOpen, toggle } = useBoolean();
  const ToggleIcon = isOpen ? FiChevronsLeft : FiChevronsRight;

  return (
    <aside
      className={`fixed top-1/2 ${
        isOpen ? "" : "-translate-x-full"
      } -translate-y-1/2 transition-transform`}
    >
      <button
        onClick={toggle}
        aria-label={isOpen ? "Close table of content" : "Open table of content"}
        className="group absolute top-1/2 -right-[42px] px-2 py-4 border-2 border-slate-300 dark:border-slate-700 rounded-r-lg bg-dim shadow-xl -translate-y-1/2"
      >
        <ToggleIcon
          size="24px"
          className="group-hover:animate-[tocarrow_0.5s_ease-in-out_infinite]"
        />
      </button>
      <div className="max-w-[calc(100vw-80px)] sm:w-[320px] max-h-80 px-8 py-6 border-2 border-slate-300 dark:border-slate-700 rounded-xl ml-4 bg-dim dark:bg-opacity-95 overflow-auto shadow-xl">
        <p className="font-bold text-2xl text-center">TOC</p>
        <hr className="my-3 border-slate-400 dark:border-slate-600" />
        <ul className="pt-2 flex flex-col gap-y-3">
          {toc.map(({ anchor, level, text }) => (
            <li key={anchor}>
              <Link
                href={"#" + anchor}
                tabIndex={isOpen ? 0 : -1}
                className="hover:text-highlight hover:underline hover:underline-offset-4"
                style={{ paddingLeft: (level - 2) * 12 + "px" }}
              >
                {text}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};
