import { createMutationObserver } from "@solid-primitives/mutation-observer";
import { onMount, onCleanup, createRoot } from "solid-js";
import { createStore } from "solid-js/store";

const createRootObserver = () => {
  const [callbacks, setCallbacks] = createStore([] as RootObserverCallback[]);
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
      if (!addedNodes) return;
      callbacks.forEach((it) => it(addedNodes));
    }
  );
  onMount(start);
  onCleanup(stop);

  const add = (callback: RootObserverCallback) => {
    setCallbacks((prev) => [...prev, callback]);
  };
  const remove = (callback: RootObserverCallback) => {
    setCallbacks((prev) => prev.filter((it) => it !== callback));
  };
  return {
    add,
    remove,
    set: setCallbacks,
  };
};

type RootObserverCallback = (addedNodes: HTMLElement[]) => void

const rootObserver = createRoot(createRootObserver);

/**
 * Observe all mutation.
 */
export const useRootObserver = (
  callback: RootObserverCallback | undefined = undefined,
  options: {
    skip: boolean
  } = {
    skip: false,
  }
) => {
  const use = rootObserver;
  if (!options.skip)
    callback && use.add(callback);
  return {
    start: () => callback && use.add(callback),
    stop: () => callback && use.remove(callback),
    rootObserver: use,
  };
};
