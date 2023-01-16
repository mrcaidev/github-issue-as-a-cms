import Moon from "components/icons/Moon";
import Sun from "components/icons/Sun";
import { createSignal, onMount } from "solid-js";

const setUserTheme = (value: string) => {
  try {
    localStorage.setItem("theme", value);
  } catch {
    // Do nothing.
  }
};

const ThemeToggler = () => {
  const [isDark, setIsDark] = createSignal(false);

  onMount(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  });

  const toggle = () => {
    if (isDark()) {
      setIsDark(false);
      document.documentElement.classList.remove("dark");
      setUserTheme("light");
    } else {
      setIsDark(true);
      document.documentElement.classList.add("dark");
      setUserTheme("dark");
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle theme"
      class="p-2 rounded hover:bg-gray-4 dark:hover:bg-graydark-4 active:bg-gray-5 dark:active:bg-graydark-5"
    >
      {isDark() ? <Sun /> : <Moon />}
    </button>
  );
};

export default ThemeToggler;
