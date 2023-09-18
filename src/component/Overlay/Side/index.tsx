import clsx from "clsx";
import {
  ComponentProps,
  JSX,
} from "solid-js";

import { CommentList } from "./CommentList";
import styles from "./Side.module.styl";

export const Side = (
  p: ComponentProps<"div">
): JSX.Element => {

  return (
    <div
      class={clsx(p.class, styles.Side)}
    >
      <CommentList />
    </div>
  );
};
