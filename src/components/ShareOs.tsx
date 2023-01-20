import Share from "./icons/Share";

type Props = {
  url: string;
  title: string;
};

const ShareOs = (props: Props) => {
  const share = async () => {
    try {
      await navigator.share({
        text: "I found a good article on the web. Check it out!",
        title: props.title,
        url: props.url,
      });
    } catch {
      // Do nothing.
    }
  };

  return (
    <button type="button" onClick={share} class="block p-3">
      <Share size={20} />
      <span class="sr-only">Share this post via your device</span>
    </button>
  );
};

export default ShareOs;
