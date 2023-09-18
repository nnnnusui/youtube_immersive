import clsx from "clsx";
import {
  ComponentProps,
  JSX,
  createEffect,
  createSignal,
  onMount,
} from "solid-js";

import { CommentList } from "./CommentList";
import styles from "./Side.module.styl";

import { querySelectHtmlElementsAsync } from "@/fn/querySelectHtmlElements";
import { usePromisesAsync } from "@/fn/usePromisesAsync";

export const Side = (
  p: ComponentProps<"div">
  & {
    usePinned: (pinned: boolean) => void
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
    p.usePinned(pinned());
  });

  return (
    <div
      class={clsx(p.class, styles.Side)}
    >
      <button
        class={styles.PinButton}
        onClick={() => setPinned((prev) => !prev)}
      >
        📌
      </button>
      <CommentList />
    </div>
  );
};
