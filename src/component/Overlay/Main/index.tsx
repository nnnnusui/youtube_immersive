import clsx from "clsx";
import {
  ComponentProps,
  JSX,
} from "solid-js";

import styles from "./Main.module.styl";

import { useElementRef } from "@/fn/state/useElementRef";
import { useInTheater } from "@/fn/state/useInTheater";
import { stylx } from "@/fn/stylx";

export const Main = (
  p: ComponentProps<"div">
  & {
    pinned: boolean,
  }
): JSX.Element => {
  const inTheater = useInTheater();
  useElementRef("#full-bleed-container", {
    onMount: (it) => it?.classList.add(styles.OverrideOriginal),
    onCleanup: (it) => it?.classList.remove(styles.OverrideOriginal),
    execBy: inTheater,
  });
  useElementRef("#full-bleed-container video", {
    onMount: (it) => it?.classList.add(styles.Video),
    onCleanup: (it) => it?.classList.remove(styles.Video),
    execBy: inTheater,
  });
  useElementRef("#full-bleed-container .ytp-chrome-bottom", {
    onMount: (it) => it?.classList.add(styles.YtpChromeBottom),
    onCleanup: (it) => it?.classList.remove(styles.YtpChromeBottom),
    execBy: inTheater,
  });

  useElementRef("#full-bleed-container", {
    onMount: (it) => it?.classList.add(styles.Pinned),
    onCleanup: (it) => it?.classList.remove(styles.Pinned),
    execBy: () => inTheater() && p.pinned,
  });

  return (
    <div
      {...p}
      class={clsx(styles.Main, p.class)}
      style={stylx(p.style)}
    >content</div>
  );
};
