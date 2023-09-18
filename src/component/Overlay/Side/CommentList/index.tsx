import {
  JSX, onMount,
} from "solid-js";

import styles from "./CommentList.module.styl";

import { querySelectHtmlElementsAsync } from "@/fn/querySelectHtmlElements";

export const CommentList = (): JSX.Element => {
  onMount(() => {
    (async () => {
      const elements = await querySelectHtmlElementsAsync("ytd-comments");
      elements.forEach((element) => {
        element.classList.add(styles.OverrideOriginal);
      });
    })();
  });

  return (
    <div
      class={ styles.CommentList }
    />
  );
};
