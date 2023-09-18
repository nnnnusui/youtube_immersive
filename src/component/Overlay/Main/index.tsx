import clsx from "clsx";
import {
  ComponentProps,
  JSX,
  onMount,
} from "solid-js";

import styles from "./Main.module.styl";

import { querySelectHtmlElementsAsync } from "@/fn/querySelectHtmlElements";
import { setCssClassAsync, usePromisesAsync } from "@/fn/setCssClassAsync";

export const Main = (
  p: ComponentProps<"div">
): JSX.Element => {
  onMount(() => {
    console.log(styles.OverrideOriginal);
    setCssClassAsync(styles.OverrideOriginal, [
      querySelectHtmlElementsAsync("#primary #player"),
    ]);
    querySelectHtmlElementsAsync("#primary #player")
      .then(console.log);
    usePromisesAsync(unsetWidthAndLeft, [
      querySelectHtmlElementsAsync("#primary #player video"),
      querySelectHtmlElementsAsync("#primary #player .ytp-chrome-bottom"),
      querySelectHtmlElementsAsync("#primary #player .ytp-chapter-hover-container"),
    ]);
  });

  return (
    <div
      {...p}
      class={clsx(p.class, styles.Main)}
    />
  );
};

const unsetWidthAndLeft = (element: HTMLElement) => {
  element.style.width = "";
  element.style.left = "";
};
