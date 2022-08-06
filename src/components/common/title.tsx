import { type PropsWithChildren } from "react";

export const Title = ({ children }: PropsWithChildren) => (
  <h2 className="relative w-fit my-8 text-2xl sm:text-3xl font-bold transition-colors">
    {children}
    <span className="absolute left-0 -bottom-2 w-[calc(100%+2rem)] h-1 rounded-full bg-sky-800 dark:bg-sky-200 transition-bg" />
  </h2>
);
