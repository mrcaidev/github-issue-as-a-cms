import { forwardRef, useContext } from "react";
import { FiMoon, FiSun } from "react-icons/fi";
import { ThemeContext } from "src/contexts/theme.context";
import { IconButton } from "../common/icon-button";

export const ThemeToggler = forwardRef<HTMLButtonElement, {}>((_, ref) => {
  const { theme, toggle } = useContext(ThemeContext);
  const Icon = theme === "light" ? FiMoon : FiSun;

  return (
    <IconButton ref={ref} ariaLabel="Toggle theme" onClick={toggle}>
      <Icon size="24px" />
    </IconButton>
  );
});

ThemeToggler.displayName = "ThemeToggler";
