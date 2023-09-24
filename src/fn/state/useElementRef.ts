import { createEffect, createSignal, onCleanup } from "solid-js";

import { querySelectHtmlElementsAsync } from "../querySelectHtmlElements";

/**
 * Referencing DOM elements, <br>
 * And [Mount, Dismount(Cleanup)] additional functions.
 */
export const useElementRef = (
  selector: UseElementRefArgs["selector"],
  options?: UseElementRefArgs["options"]
) => {
  const getSelector
    = typeof selector === "function"
      ? selector
      : () => selector;

  const [getRef, setRef] = createSignal<HTMLElement>();
  const [destributeRef, setDestributeRef] = createSignal<HTMLElement>();
  createEffect(() => {
    const refs = getRef();
    if (refs) return;
    querySelectHtmlElementsAsync(getSelector())
      .then((it) => setRef(it[0]));
  });

  const mount = () => options?.onMount?.(getRef());
  const cleanup = () => options?.onCleanup?.(getRef());
  onCleanup(cleanup);

  createEffect(() => {
    const execBy = options?.execBy?.();
    if (execBy === undefined) return;
    if (execBy) {
      mount();
      setDestributeRef(getRef());
    } else {
      cleanup();
      setDestributeRef();
    }
  });

  return {
    ref: destributeRef,
    mount,
    cleanup,
  };
};

export type UseElementRefArgs = {
  selector: (() => string) | string,
  options?: {
    onMount?: (ref: HTMLElement | undefined) => void,
    onCleanup?: (ref: HTMLElement | undefined) => void,
    execBy?: () => boolean,
  }
}
