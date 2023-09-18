import clsx from "clsx";
import {
  JSX, createEffect, createSignal, onMount, Show, untrack, ComponentProps,
} from "solid-js";

import styles from "./Header.module.styl";

import { querySelectHtmlElements } from "@/fn/querySelectHtmlElements";

export const Header = (p: {
  class: ComponentProps<"div">["class"]
}): JSX.Element => {
  const element = () => querySelectHtmlElements("#masthead-container")[0];

  const [displayingPullTab, setDisplayingPullTab] = createSignal(false);
  const [allowPointerEvent, setAllowPointerEvent] = createSignal(true);

  const hide = () => element().classList.add(styles.HideToTop);
  const show = () => element().classList.remove(styles.HideToTop);
  const [displaying, setDisplaying] = createSignal(false);
  createEffect(() => {
    if (!displaying()) return;
    show();
    setDisplayingPullTab(false);
    const hideCallback = () => {
      untrack(() => setDisplaying(false));
      setAllowPointerEvent(true);
      hide();
    };
    element().addEventListener("focusout", () => {
      hideCallback();
    }, { once: true });
    element().addEventListener("mouseleave", () => {
      const isFocused = element().contains(document.activeElement);
      if (isFocused) return;
      hideCallback();
    }, { once: true });
  });
  // const tryHide = () => {
  //   displaying()
  //     ? undefined
  //     : hide();
  // };

  const [originalHeight, setOriginalHeight] = createSignal("2em");
  onMount(() => {
    hide();
    setOriginalHeight(`${element().clientHeight}px`);
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
            setDisplaying(true);
            setAllowPointerEvent(false);
          }}
        >
          {displaying()
            ? "hide Header ∧"
            : "show Header ∨"
          }
        </button>
      </Show>
    </div>
  );
};
