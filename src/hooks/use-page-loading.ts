import { useMount } from "@mrcaidev/hooks";
import { useRouter } from "next/router";
import { useState } from "react";

export const usePageLoading = (timeout = 400) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  let timer: NodeJS.Timeout;
  const startLoading = () => {
    timer = setTimeout(() => setIsLoading(true), timeout);
  };
  const endLoading = () => {
    if (timer) clearTimeout(timer);
    setIsLoading(false);
  };

  useMount(() => {
    router.events.on("routeChangeStart", startLoading);
    router.events.on("routeChangeComplete", endLoading);
    router.events.on("routeChangeError", endLoading);

    return () => {
      router.events.off("routeChangeStart", startLoading);
      router.events.off("routeChangeComplete", endLoading);
      router.events.off("routeChangeError", endLoading);
    };
  });

  return isLoading;
};
