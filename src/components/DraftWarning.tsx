import { createEffect, createSignal, onMount } from "solid-js";
import { getStorage, setStorage } from "utils/storage";

type Props = {
  slug: number;
  origin: string;
};

const STORAGE_KEY = "rememberedSlugs";

const DraftWarning = (props: Props) => {
  let dialogRef: HTMLDialogElement;
  const [shouldShowModal, setShouldShowModal] = createSignal(true);
  const [shouldRemember, setShouldRemember] = createSignal(false);

  onMount(() => {
    const rememberedSlugs = JSON.parse(getStorage(STORAGE_KEY) ?? "[]");
    setShouldShowModal(!rememberedSlugs.includes(props.slug));
  });

  createEffect(() => {
    if (shouldShowModal()) {
      dialogRef.showModal();
    } else {
      dialogRef.close();

      if (!shouldRemember()) {
        return;
      }

      const rememberedSlugs = JSON.parse(getStorage(STORAGE_KEY) ?? "[]");
      if (rememberedSlugs.includes(props.slug)) {
        return;
      }
      rememberedSlugs.push(props.slug);
      setStorage(STORAGE_KEY, JSON.stringify(rememberedSlugs));
    }
  });

  return (
    <dialog
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      ref={dialogRef!}
      class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 space-y-3 max-w-2xl w-[calc(100%-32px)] px-6 py-5 md:px-8 md:py-6 rounded-lg shadow-lg m-0 bg-gray-1 dark:bg-graydark-1 text-current backdrop:bg-graydark-6 backdrop:bg-opacity-60 backdrop:backdrop-blur"
    >
      <h1 class="font-bold text-2xl">⚠️ This is a draft</h1>
      <p>
        You are welcome to preview this post ahead of time, but please keep in
        mind that it may contain inaccurate or incomplete information.
        <br />
        You can always&nbsp;
        <a
          href={props.origin}
          class="hover:text-cyan-11 dark:hover:text-cyandark-11 underline underline-offset-4"
        >
          keep up with the latest changes
        </a>
        &nbsp;on GitHub.
      </p>
      <form class="flex flex-col md:flex-row justify-between items-center gap-3">
        <label
          classList={{
            "order-2 md:order-1 block text-center select-none": true,
            "text-gray-11 dark:text-graydark-11": !shouldRemember(),
            "text-gray-12 dark:text-graydark-12": shouldRemember(),
          }}
        >
          <input
            type="checkbox"
            name="shouldRemember"
            checked={shouldRemember()}
            onChange={(e) => setShouldRemember(e.currentTarget.checked)}
            class="w-3 h-3 mr-2 translate-y-[1px]"
          />
          Remember for this post
        </label>
        <div class="order-1 md:order-2 flex justify-center items-center gap-2">
          <a
            href="/"
            target="_blank"
            class="px-4 py-2 rounded font-medium hover:bg-gray-4 dark:hover:bg-graydark-4 active:bg-gray-5 dark:active:bg-graydark-5"
          >
            Go back
          </a>
          <button
            type="button"
            onClick={() => setShouldShowModal(false)}
            class="px-4 py-2 rounded font-medium bg-cyan-9 dark:bg-cyandark-9 hover:bg-cyan-10 dark:hover:bg-cyandark-10 text-graydark-12"
          >
            Show me
          </button>
        </div>
      </form>
    </dialog>
  );
};

export default DraftWarning;
