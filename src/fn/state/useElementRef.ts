import { createEffect, createSignal, onCleanup, onMount } from "solid-js";

import { querySelectHtmlElementsAsync } from "../querySelectHtmlElements";

/**
 * Referencing DOM elements, <br>
 * And [Mount, Dismount(Cleanup)] additional functions.
 */
export const useElementRef = (
  selector: (() => string) | string,
  options?: {
    onMount?: (ref: HTMLElement | undefined) => void,
    onCleanup?: (ref: HTMLElement | undefined) => void,
    execBy?: () => boolean,
  }
) => {
  const getSelector
    = typeof selector === "function"
      ? selector
      : () => selector;

  const [getRef, setRef] = createSignal<HTMLElement>();
  createEffect(() => {
    const refs = getRef();
    if (refs) return;
    querySelectHtmlElementsAsync(getSelector())
      .then((it) => setRef(it[0]));
  });

  const mount = () => options?.onMount?.(getRef());
  const cleanup = () => options?.onCleanup?.(getRef());
  onMount(mount);
  onCleanup(cleanup);

  createEffect(() => {
    const execBy = options?.execBy?.();
    if (execBy === undefined) return;
    execBy
      ? mount()
      : cleanup();
  });

  return {
    ref: getRef,
    mount,
    cleanup,
  };
};
