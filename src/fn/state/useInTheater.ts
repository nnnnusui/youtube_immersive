import { createEffect, createRoot, createSignal, onCleanup, onMount } from "solid-js";

import { useRootObserver } from "./useRootObserver";

const createInTheater = () => {
  const [inTheater, setInTheater] = createSignal(false);
  const [hasTheater, setHasTheater] = createSignal(false);
  const [inWatch, setInWatch] = createSignal(false);
  createEffect(() => {
    setInTheater(hasTheater() && inWatch());
  });

  // update `hasTheater`.
  useRootObserver((addedNodes) => {
    const finded = addedNodes.find((it) => it.id === "player-container");
    if (!finded) return;
    const hasTheater = finded.parentElement?.id === "player-full-bleed-container";
    setHasTheater(hasTheater);
  });

  // update `inWatch`
  const [checkInWatchTaskId, setCheckInWatchTaskId] = createSignal<NodeJS.Timer>();
  onMount(() =>
    setCheckInWatchTaskId(
      setInterval(() => {
        const url = new URL(document.URL);
        const inWatch = url.pathname.endsWith("/watch");
        setInWatch(inWatch);
      }, 100)
    )
  );
  onCleanup(() => clearInterval(checkInWatchTaskId()));

  return inTheater;
};

const inTheater = createRoot(createInTheater);

/**
 * Indicates "displaying" video in theater mode.
 */
export const useInTheater = () => {
  return inTheater;
};
