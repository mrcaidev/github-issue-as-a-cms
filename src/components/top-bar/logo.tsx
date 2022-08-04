import Image from "next/image";
import logo from "public/logo.svg";
import { Link } from "../common/link";

export const Logo = () => (
  <div className="flex gap-x-1 items-center">
    <Image src={logo} alt="Logo" width="28px" height="48px" />
    <Link href="/" className="px-2 py-1 text-3xl font-bold transition-colors">
      MRCAI
    </Link>
  </div>
);
