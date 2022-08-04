import { FiGithub } from "react-icons/fi";
import { Link } from "../common/link";

export const GithubLink = () => (
  <Link
    href="https://github.com/mrcaidev/blog"
    aria-label="View source code on GitHub"
    className="ghost"
  >
    <FiGithub size="24px" />
  </Link>
);
