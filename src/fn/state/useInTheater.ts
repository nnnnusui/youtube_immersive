import { createEffect, createRoot, createSignal, onCleanup, onMount } from "solid-js";

const createInTheater = () => {
  const [inTheater, setInTheater] = createSignal(false);
  const [hasTheater, setHasTheater] = createSignal(false);
  const [inWatch, setInWatch] = createSignal(false);
  createEffect(() => {
    setInTheater(hasTheater() && inWatch());
  });

  // update `hasTheater`.
  const [checkHasTheaterTaskId, setCheckHasTheaterTaskId] = createSignal<NodeJS.Timeout>();
  onMount(() => {
    setCheckHasTheaterTaskId(
      setInterval(() => {
        const finded = document.querySelector("#player-full-bleed-container > #player-container");
        setHasTheater(!!finded);
      }, 300)
    );
  });
  onCleanup(() => clearInterval(checkHasTheaterTaskId()));

  // update `inWatch`
  const [checkInWatchTaskId, setCheckInWatchTaskId] = createSignal<NodeJS.Timeout>();
  onMount(() =>
    setCheckInWatchTaskId(
      setInterval(() => {
        const url = new URL(document.URL);
        const inWatch = url.pathname.endsWith("/watch");
        setInWatch(inWatch);
      }, 300)
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
