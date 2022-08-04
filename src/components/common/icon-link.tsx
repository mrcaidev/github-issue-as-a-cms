import { type AnchorHTMLAttributes, type DetailedHTMLProps } from "react";
import { Link } from "./link";

interface IProps
  extends DetailedHTMLProps<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  > {
  href: string;
  ariaLabel: string;
}

export const IconLink = ({ href, ariaLabel, children, ...rest }: IProps) => (
  <Link
    href={href}
    aria-label={ariaLabel}
    className="w-fit h-fit p-2 hover:text-sky-600 hover:dark:text-sky-400 active:text-sky-500 active:dark:text-sky-500 transition-colors"
    {...rest}
  >
    {children}
  </Link>
);
