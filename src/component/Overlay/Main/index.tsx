import clsx from "clsx";
import {
  ComponentProps,
  JSX,
  onMount,
} from "solid-js";

import styles from "./Main.module.styl";

import { querySelectHtmlElementsAsync } from "@/fn/querySelectHtmlElements";
import { usePromisesAsync } from "@/fn/usePromisesAsync";

export const Main = (
  p: ComponentProps<"div">
): JSX.Element => {
  onMount(() => {
    usePromisesAsync((it) => it.classList.add(styles.OverrideOriginal), [
      querySelectHtmlElementsAsync("#full-bleed-container"),
    ]);
  });

  return (
    <div
      {...p}
      class={clsx(p.class, styles.Main)}
    />
  );
};
