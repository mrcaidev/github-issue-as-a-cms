import Image from "next/image";
import logo from "public/logo.svg";
import contacts from "src/data/contacts.json";
import navigationLinks from "src/data/navigation-links.json";
import { Link } from "./common/link";

const year = new Date().getFullYear();

const Footer = () => (
  <footer className="px-8 py-16 bg-slate-200 dark:bg-slate-800 shadow-inner transition-bg">
    <div className="flex justify-center items-center gap-16 flex-wrap-reverse max-w-4xl mx-auto">
      <div className="flex flex-col items-center gap-y-2">
        <Image src={logo} alt="logo" width="44" height="60" />
        <Link
          href="https://mrcai.space"
          className="px-2 py-1 font-bold text-xl text-link"
        >
          mrcai.space
        </Link>
        <small className="text-xs text-dim text-center">
          Copyright © {year} Yuwang Cai. All Rights Reserved.
        </small>
      </div>
      <div className="grow flex justify-evenly items-start gap-12">
        <div>
          <p className="pb-3 font-semibold text-lg text-dim text-center">
            LINKS
          </p>
          <nav className="flex flex-col items-center gap-y-1">
            {navigationLinks.map(({ name, href }) => (
              <Link key={name} href={href} className="px-2 py-1 text-link">
                {name}
              </Link>
            ))}
          </nav>
        </div>
        <div>
          <p className="pb-3 font-semibold text-lg text-dim text-center">
            CONTACTS
          </p>
          <nav className="flex flex-col items-center gap-y-1">
            {contacts.map(({ name, href }) => (
              <Link key={name} href={href} className="px-2 py-1 text-link">
                {name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
