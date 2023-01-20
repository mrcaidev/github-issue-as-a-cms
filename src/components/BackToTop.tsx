import ArrowUp from "./icons/ArrowUp";

const BackToTop = () => (
  <button
    type="button"
    onClick={() => scrollTo({ top: 0 })}
    class="p-2 rounded hover:bg-gray-4 dark:hover:bg-graydark-4 active:bg-gray-5 dark:active:bg-graydark-5"
  >
    <ArrowUp />
    <span class="sr-only">Scroll to top</span>
  </button>
);

export default BackToTop;
