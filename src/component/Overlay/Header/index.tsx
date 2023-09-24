import { createElementSize } from "@solid-primitives/resize-observer";
import clsx from "clsx";
import {
  JSX, createSignal, ComponentProps, createEffect, Setter,
} from "solid-js";

import styles from "./Header.module.styl";

import { createPullTab } from "@/fn/state/createPullTab";
import { useElementRef } from "@/fn/state/useElementRef";
import { useInTheater } from "@/fn/state/useInTheater";
import { stylx } from "@/fn/stylx";

export const Header = (
  p: ComponentProps<"div">
  & {
    setHeaderHeight: Setter<string>
    setSuppressClickCallback: Setter<{ callback: () => void } | undefined>
  }
): JSX.Element => {
  const inTheater = useInTheater();
  useElementRef("#masthead-container", {
    onMount: (it) => it?.classList.add(styles.OverrideOriginal),
    onCleanup: (it) => it?.classList.remove(styles.OverrideOriginal),
    execBy: inTheater,
  });
  useElementRef("#page-manager", {
    onMount: (it) => it?.classList.add(styles.IgnoreHeaderMargin),
    onCleanup: (it) => it?.classList.remove(styles.IgnoreHeaderMargin),
    execBy: inTheater,
  });

  const [originalHeight, setOriginalHeight] = createSignal("2em");
  const originalHeader = useElementRef("#masthead-container", {
    onMount: (it) => {
      // it?.classList.add(styles.HideToTop);
      it && setOriginalHeight(`${it.clientHeight}px`);
    },
    onCleanup: (it) => it?.classList.remove(styles.HideToTop),
    execBy: () =>  inTheater(),
  });

  const [getRef, setRef] = createSignal<HTMLElement>();
  const size = createElementSize(getRef);
  createEffect(() => p.setHeaderHeight(`${size.height}px`));

  const pullTab = createPullTab([getRef, originalHeader.ref]);
  createEffect(() => {
    const ref = originalHeader.ref();
    if (!ref) return;
    pullTab.target.isShown
      ? ref.classList.remove(styles.HideToTop)
      : ref.classList.add(styles.HideToTop);
    ref.addEventListener("click", pullTab.target.props.onClick);
    ref.addEventListener("pointerleave", pullTab.target.props.onPointerLeave);
  });
  createEffect(() => {
    p.setSuppressClickCallback(
      pullTab.target.focused
        ? {
          callback: pullTab.unFocus,
        }
        : undefined
    );
  });

  return (
    <div
      {...p}
      style={stylx({
        "--original-height": originalHeight(),
        "pointer-events": pullTab.detector.standby ? "auto" : "none",
      }, p.style)}
      class={clsx(styles.Header, p.class)}
      ref={setRef}
      onPointerEnter={pullTab.detector.props.onPointerEnter}
    >
      <button
        {...pullTab.props}
        class={clsx(
          styles.PullTab,
          !pullTab.isShown && styles.HideToTop
        )}
      >
        {pullTab.isShown
          ? "show Header ∨"
          : "hide Header ∧"
        }
      </button>
    </div>
  );
};
