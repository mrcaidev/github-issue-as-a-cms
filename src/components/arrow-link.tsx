import { type PropsWithChildren } from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { Link } from "./common/link";

interface IProps extends PropsWithChildren {
  href: string;
  direction?: "left" | "right";
}

export const ArrowLink = ({ href, direction = "right", children }: IProps) => (
  <div className="py-4 text-center animate-rise">
    <Link href={href} className="px-4 py-2 rounded-md bg-ghost">
      {direction === "left" && (
        <FiArrowLeft className="inline-block w-5 mr-1 -translate-y-0.5" />
      )}
      {children}
      {direction === "right" && (
        <FiArrowRight className="inline-block w-5 ml-1 -translate-y-0.5" />
      )}
    </Link>
  </div>
);
