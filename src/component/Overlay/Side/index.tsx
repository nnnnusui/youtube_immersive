import clsx from "clsx";
import {
  ComponentProps,
  JSX,
  Setter,
  createEffect,
  createSignal, For, Show,
} from "solid-js";

import styles from "./Side.module.styl";
import { VisibilitySwitchOption } from "./VisibilitySwitchOption";

import { createPullTab } from "@/fn/state/createPullTab";
import { useElementRef } from "@/fn/state/useElementRef";
import { useInTheater } from "@/fn/state/useInTheater";

export const Side = (
  p: ComponentProps<"div">
  & {
    pinned: boolean
    setPinned: Setter<boolean>
    setSideWidth: (sideWidth: string) => void
    setSuppressClickCallback: Setter<{ callback: () => void } | undefined>
  }
): JSX.Element => {
  const inTheater = useInTheater();
  useElementRef("#columns", {
    onMount: (it) => it?.classList.add(styles.OverrideOriginal),
    onCleanup: (it) => it?.classList.remove(styles.OverrideOriginal),
    execBy: inTheater,
  });
  useElementRef("#columns", {
    onMount: (it) => it?.classList.add(styles.Pinned),
    onCleanup: (it) => it?.classList.remove(styles.Pinned),
    execBy: () => inTheater() && p.pinned,
  });
  useElementRef("ytd-text-inline-expander", {
    onMount: (it) => it?.setAttribute("is-expanded", ""),
    onCleanup: (it) => it?.removeAttribute("is-expanded"),
    execBy: inTheater,
  });
  useElementRef("ytd-live-chat-frame", {
    onMount: (it) => it?.removeAttribute("collapsed"),
    execBy: inTheater,
  });
  useElementRef("ytd-watch-metadata", {
    onMount: (it) => it?.removeAttribute("description-collapsed"),
    execBy: inTheater,
  });
  useElementRef("ytd-watch-metadata tp-yt-paper-button#expand", {
    onMount: (it) => it?.setAttribute("hidden", ""),
    execBy: inTheater,
  });
  useElementRef("ytd-watch-metadata tp-yt-paper-button#collapse", {
    onMount: (it) => it?.setAttribute("hidden", ""),
    onCleanup: (it) => it?.removeAttribute("hidden"),
    execBy: inTheater,
  });

  const [getRef, setRef] = createSignal<HTMLDivElement>();

  const hideOriginal = useElementRef("#columns", {
    onMount: (it) => {
      it?.classList.add(styles.HideToRight);
    },
    onCleanup: (it) => it?.classList.remove(styles.HideToRight),
    execBy: () =>  inTheater() && !p.pinned,
  });

  const pullTab = createPullTab([getRef, hideOriginal.ref]);
  createEffect(() => {
    const ref = hideOriginal.ref();
    if (!ref) return;
    pullTab.target.isShown
      ? ref.classList.remove(styles.HideToRight)
      : ref.classList.add(styles.HideToRight);
    ref.addEventListener("click", pullTab.target.props.onClick);
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

  const nav = {
    description: "#columns ytd-watch-metadata",
    chat: "#columns #chat-container",
    comments: "#columns ytd-comments#comments",
    playlist: "#columns ytd-playlist-panel-renderer",
    related: "#columns #related",
  };
  const [visibleNav, setVisibleNav] = createSignal("description");

  return (
    <div
      class={clsx(
        p.class,
        styles.Side,
      )}
      ref={setRef}
    >
      <div
        class={clsx(
          styles.Resizer,
          p.pinned || !pullTab.target.isShown && styles.Hide,
        )}
        onPointerDown={(event) => {
          const ref = event.currentTarget;
          ref.setPointerCapture(event.pointerId);
          const onMove = (event: PointerEvent) => {
            const width = window.innerWidth - event.clientX;
            p.setSideWidth(`${width}px`);
          };
          const onLeave = () => ref.removeEventListener("pointermove", onMove, false);
          ref.addEventListener("pointermove", onMove, false);
          ref.addEventListener("pointerup", onLeave, { once: false });
        }}
      />
      <Show when={!p.pinned}>
        <div
          {...pullTab.detector.props}
          class={styles.PullTabContainer}
          style={{
            "pointer-events": pullTab.detector.standby ? "auto" : "none",
          }}
        >
          <button
            {...pullTab.props}
            class={clsx(
              styles.PullTab,
              !pullTab.isShown && styles.HideToRight
            )}
          >
            {pullTab.isShown
              ? ">"
              : "<"
            }
          </button>
        </div>
      </Show>
      <div
        class={clsx(
          styles.Controls,
          p.pinned || !pullTab.target.isShown && styles.HideToRight,
        )}
      >
        <button
          class={clsx(
            styles.PinButton,
            p.pinned && styles.Pinned,
          )}
          onClick={() => p.setPinned((prev) => !prev)}
        >
          📌
        </button>
        <For each={Object.entries(nav)}>{([name, selector]) => (
          <VisibilitySwitchOption
            class={styles.TabButton}
            label={<>{name}</>}
            selector={selector}
            visible={name === visibleNav()}
            onClick={() => setVisibleNav(name)}
          />
        )}</For>
      </div>
    </div>
  );
};
