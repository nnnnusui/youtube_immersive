import clsx from "clsx";
import {
  JSX, createSignal, Show, ComponentProps, createEffect,
} from "solid-js";

import styles from "./Header.module.styl";

import { useElementRef } from "@/fn/state/useElementRef";
import { useInTheater } from "@/fn/state/useInTheater";

export const Header = (p: {
  class: ComponentProps<"div">["class"]
}): JSX.Element => {
  const inTheater = useInTheater();
  useElementRef("#masthead-container #background", {
    onMount: (it) => it?.classList.add(styles.TransparentOverride),
    onCleanup: (it) => it?.classList.remove(styles.TransparentOverride),
    execBy: inTheater,
  });
  useElementRef("#page-manager", {
    onMount: (it) => it?.classList.add(styles.IgnoreHeaderMargin),
    onCleanup: (it) => it?.classList.remove(styles.IgnoreHeaderMargin),
    execBy: inTheater,
  });

  const [displayingPullTab, setDisplayingPullTab] = createSignal(false);
  const [allowPointerEvent, setAllowPointerEvent] = createSignal(true);

  const [originalHeight, setOriginalHeight] = createSignal("2em");
  const [headerHided, setHeaderHided] = createSignal(false);
  createEffect(() => inTheater() && setHeaderHided(true));
  const hideOriginalHeader = useElementRef("#masthead-container", {
    onMount: (it) => {
      it?.classList.add(styles.HideToTop);
      it && setOriginalHeight(`${it.clientHeight}px`);
    },
    onCleanup: (it) => {
      it?.classList.remove(styles.HideToTop);
      if (!inTheater()) return;

      const hideCallback = () => {
        setHeaderHided(true);
        setAllowPointerEvent(true);
        hideOriginalHeader.mount();
      };
      hideOriginalHeader.ref()?.addEventListener("focusout", () => {
        hideCallback();
      }, { once: true });
      hideOriginalHeader.ref()?.addEventListener("mouseleave", () => {
        const isFocused = hideOriginalHeader.ref()?.contains(document.activeElement);
        if (isFocused) return;
        hideCallback();
      }, { once: true });
    },
    execBy: () =>  inTheater() && headerHided(),
  });

  return (
    <div
      style={{
        "--original-height": originalHeight(),
        "pointer-events": allowPointerEvent() ? "auto" : "none",
      }}
      class={clsx(p.class, styles.Header)}
      onMouseEnter={() => {
        setDisplayingPullTab(true);
        setAllowPointerEvent(false);
      }}
    >
      <Show when={displayingPullTab()}>
        <button
          class={styles.PullTab}
          onMouseEnter={() => {
            setHeaderHided(false);
            setAllowPointerEvent(false);
          }}
        >
          {headerHided()
            ? "show Header ∨"
            : "hide Header ∧"
          }
        </button>
      </Show>
    </div>
  );
};
