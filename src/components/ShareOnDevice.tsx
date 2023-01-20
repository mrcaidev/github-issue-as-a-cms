import Share from "components/icons/Share";

type Props = {
  text: string;
  url: string;
  title: string;
};

const ShareOnDevice = (props: Props) => {
  const share = async () => {
    try {
      await navigator.share({
        text: props.text,
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
      <span class="sr-only">Share this post on your device</span>
    </button>
  );
};

export default ShareOnDevice;
