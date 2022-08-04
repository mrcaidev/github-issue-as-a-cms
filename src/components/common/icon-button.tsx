import {
  forwardRef,
  type ButtonHTMLAttributes,
  type DetailedHTMLProps,
} from "react";

interface IProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  ariaLabel: string;
}

export const IconButton = forwardRef<HTMLButtonElement, IProps>(
  ({ ariaLabel, children, ...rest }, ref) => (
    <button
      ref={ref}
      aria-label={ariaLabel}
      className="w-fit h-fit p-2 hover:text-sky-600 hover:dark:text-sky-400 active:text-sky-500 active:dark:text-sky-500 transition-colors"
      {...rest}
    >
      {children}
    </button>
  )
);

IconButton.displayName = "IconButton";
