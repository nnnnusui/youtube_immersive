import clsx from "clsx";
import {
  ComponentProps,
  JSX,
  createEffect,
  onMount,
} from "solid-js";

import styles from "./Main.module.styl";

import { querySelectHtmlElements, querySelectHtmlElementsAsync } from "@/fn/querySelectHtmlElements";
import { usePromisesAsync } from "@/fn/usePromisesAsync";

export const Main = (
  p: ComponentProps<"div">
  & {
    pinned: boolean
  }
): JSX.Element => {
  onMount(() => {
    usePromisesAsync((it) => it.classList.add(styles.OverrideOriginal), [
      querySelectHtmlElementsAsync("#full-bleed-container"),
    ]);
    usePromisesAsync((it) => it.classList.add(styles.Video), [
      querySelectHtmlElementsAsync("#full-bleed-container video"),
    ]);
    usePromisesAsync((it) => it.classList.add(styles.YtpChromeBottom), [
      querySelectHtmlElementsAsync("#full-bleed-container .ytp-chrome-bottom"),
    ]);
  });
  createEffect(() => {
    const element = querySelectHtmlElements("#full-bleed-container")[0];
    if (!element) return;
    p.pinned
      ? element.classList.add(styles.Pinned)
      : element.classList.remove(styles.Pinned);
  });

  return (
    <div
      {...p}
      class={clsx(p.class, styles.Main)}
    />
  );
};
