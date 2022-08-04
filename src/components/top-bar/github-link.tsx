import { FiGithub } from "react-icons/fi";
import { IconLink } from "../common/icon-link";

export const GithubLink = () => (
  <IconLink
    href="https://github.com/mrcaidev/blog"
    ariaLabel="View source code on GitHub"
  >
    <FiGithub size="24px" />
  </IconLink>
);
