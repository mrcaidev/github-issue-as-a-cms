import { type PropsWithChildren } from "react";

export const Title = ({ children }: PropsWithChildren) => (
  <h2 className="relative w-fit py-8 text-2xl sm:text-3xl font-semibold transition-colors">
    {children}
    <div className="absolute w-[150%] h-0.5 rounded-full bg-sky-800 dark:bg-sky-200 transition-bg" />
  </h2>
);
