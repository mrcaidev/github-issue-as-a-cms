import ArrowUp from "./icons/ArrowUp";

const BackToTop = () => (
  <button
    type="button"
    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    aria-label="Back to top"
    class="p-2 rounded hover:bg-gray-4 dark:hover:bg-graydark-4 active:bg-gray-5 dark:active:bg-graydark-5"
  >
    <ArrowUp />
  </button>
);

export default BackToTop;
