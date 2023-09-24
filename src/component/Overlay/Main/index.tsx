import clsx from "clsx";
import {
  ComponentProps,
  JSX,
  Setter,
  createEffect,
} from "solid-js";

import styles from "./Main.module.styl";

import { useElementRef } from "@/fn/state/useElementRef";
import { useInTheater } from "@/fn/state/useInTheater";
import { stylx } from "@/fn/stylx";

export const Main = (
  p: ComponentProps<"div">
  & {
    pinned: boolean,
    suppressClickCallback: { callback: () => void } | undefined
    setSuppressClickCallback: Setter<{ callback: () => void } | undefined>
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

  useElementRef("#full-bleed-container video", {
    onMount: (it) => {
      const suppresser = document.createElement("div");
      suppresser.classList.add("suppresser");
      suppresser.style.position = "absolute";
      suppresser.style.top = "0";
      suppresser.style.left = "0";
      suppresser.style.width = "100vw";
      suppresser.style.height = "100vh";
      createEffect(() => {
        suppresser.style.pointerEvents
          = p.suppressClickCallback ? "auto" : "none";
      });
      suppresser.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        p.suppressClickCallback?.callback();
        p.setSuppressClickCallback();
      });
      it?.parentElement?.insertBefore(suppresser, null);
    },
    onCleanup: (it) => {
      Array.from(it?.parentElement?.children ?? [])
        .filter((it) => it.classList.contains("suppresser"))
        .forEach((it) => it.remove());
    },
    execBy: inTheater,
  });

  return (
    <div
      {...p}
      class={clsx(styles.Main, p.class)}
      style={stylx(p.style)}
    />
  );
};
