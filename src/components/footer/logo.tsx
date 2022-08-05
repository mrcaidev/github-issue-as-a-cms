import Image from "next/image";
import logo from "public/logo.svg";
import { Link } from "../common/link";

const year = new Date().getFullYear();

export const Logo = () => (
  <div className="grow flex flex-col items-center gap-y-2">
    <Image src={logo} alt="logo" width="44" height="60" />
    <Link
      href="https://mrcai.space"
      className="p-1 text-xl font-bold transition-colors hover:underline hover:underline-offset-4"
    >
      mrcai.space
    </Link>
    <small className="text-xs text-slate-600 dark:text-slate-400 text-center transition-colors">
      Copyright © {year} Yuwang Cai. All Rights Reserved.
    </small>
  </div>
);
