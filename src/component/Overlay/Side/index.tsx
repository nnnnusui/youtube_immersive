import clsx from "clsx";
import {
  ComponentProps,
  JSX,
  createEffect,
  createSignal,
  onMount,
} from "solid-js";

import styles from "./Side.module.styl";

import { querySelectHtmlElementsAsync } from "@/fn/querySelectHtmlElements";
import { usePromisesAsync } from "@/fn/usePromisesAsync";

export const Side = (
  p: ComponentProps<"div">
  & {
    setPinned: (pinned: boolean) => VideoDecoderConfig
    setSideSize: (sideSize: string) => void
  }
): JSX.Element => {
  onMount(() => {
    usePromisesAsync((it) => it.classList.add(styles.OverrideOriginal), [
      querySelectHtmlElementsAsync("#columns"),
    ]);
    usePromisesAsync((it) => it.classList.add(styles.Description), [
      querySelectHtmlElementsAsync("#columns #below"),
    ]);
  });

  const [pinned, setPinned] = createSignal(false);
  createEffect(() => {
    p.setPinned(pinned());
  });
  const [getRef, setRef] = createSignal<HTMLDivElement>();
  createEffect(() => {
    const ref = getRef();
    if (!ref) return;
    p.setSideSize(`${ref.clientWidth}px`);
  });

  return (
    <div
      class={clsx(p.class, styles.Side)}
      ref={setRef}
    >
      <button
        class={styles.PinButton}
        onClick={() => setPinned((prev) => !prev)}
      >
        📌
      </button>
    </div>
  );
};
