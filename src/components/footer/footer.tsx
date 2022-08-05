import { Contacts } from "./contacts";
import { Links } from "./links";
import { Logo } from "./logo";
import { Wave } from "./wave";

export const Footer = () => (
  <footer>
    <Wave />
    <div className="p-10 bg-slate-200 dark:bg-slate-800 transition-bg">
      <div className="flex justify-center items-center gap-x-8 gap-y-12 flex-wrap-reverse max-w-5xl mx-auto">
        <Logo />
        <div className="grow-[2] flex justify-evenly items-start gap-x-8">
          <Links />
          <Contacts />
        </div>
      </div>
    </div>
  </footer>
);
