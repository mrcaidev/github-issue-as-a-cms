import { type PropsWithChildren } from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { Link } from "./common/link";

interface IProps extends PropsWithChildren {
  href: string;
  direction?: "left" | "right";
}

export const ArrowLink = ({ href, direction = "right", children }: IProps) => (
  <div className="py-4 animate-rise">
    <Link
      href={href}
      className="flex items-center gap-x-1 w-fit px-4 py-2 mx-auto rounded-md hover:bg-dim hover:text-highlight"
    >
      {direction === "left" && <FiArrowLeft />}
      {children}
      {direction === "right" && <FiArrowRight />}
    </Link>
  </div>
);
