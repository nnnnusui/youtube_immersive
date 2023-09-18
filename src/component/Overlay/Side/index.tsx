import clsx from "clsx";
import {
  ComponentProps,
  JSX,
  onMount,
} from "solid-js";

import { CommentList } from "./CommentList";
import styles from "./Side.module.styl";

import { querySelectHtmlElementsAsync } from "@/fn/querySelectHtmlElements";
import { usePromisesAsync } from "@/fn/usePromisesAsync";

export const Side = (
  p: ComponentProps<"div">
): JSX.Element => {
  onMount(() => {
    usePromisesAsync((it) => it.classList.add(styles.OverrideOriginal), [
      querySelectHtmlElementsAsync("#columns"),
    ]);
    usePromisesAsync((it) => it.classList.add(styles.Description), [
      querySelectHtmlElementsAsync("#columns #below"),
    ]);
  });

  return (
    <div
      class={clsx(p.class, styles.Side)}
    >
      <CommentList />
    </div>
  );
};
