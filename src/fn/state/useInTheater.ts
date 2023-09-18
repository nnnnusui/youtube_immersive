import { createMutationObserver } from "@solid-primitives/mutation-observer";
import { createEffect, createSignal, onCleanup, onMount } from "solid-js";

/**
 * Indicates "displaying" video in theater mode.
 */
export const useInTheater = () => {
  const [inTheater, setInTheater] = createSignal(false);
  const [hasTheater, setHasTheater] = createSignal(false);
  const [inWatch, setInWatch] = createSignal(false);
  createEffect(() => {
    setInTheater(hasTheater() && inWatch());
  });

  // update `hasTheater`.
  const [, { start, stop }] = createMutationObserver(
    document.body,
    {
      childList: true,
      subtree: true,
    },
    (mutations) => {
      const addedNodes
        = mutations.flatMap((it) => Array.from(it.addedNodes))
          .map((it) => it as HTMLElement);
      const finded
        = addedNodes.find((it) => it.id === "player-container");
      if (!finded) return;
      const hasTheater = finded.parentElement?.id === "player-full-bleed-container";
      setHasTheater(hasTheater);
    }
  );
  onMount(start);
  onCleanup(stop);

  // update `inWatch`
  const [checkInWatchTaskId, setCheckInWatchTaskId] = createSignal<number>();
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

  return [inTheater];
};
