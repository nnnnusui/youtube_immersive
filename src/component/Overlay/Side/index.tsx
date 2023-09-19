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

import { useElementRef } from "@/fn/state/useElementRef";
import { useInTheater } from "@/fn/state/useInTheater";

export const Side = (
  p: ComponentProps<"div">
  & {
    pinned: boolean
    setPinned: Setter<boolean>
    setSideSize: (sideSize: string) => void
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

  const [displayingPullTab, setDisplayingPullTab] = createSignal(false);
  const [allowPointerEvent, setAllowPointerEvent] = createSignal(true);
  const [originalHided, setOriginalHided] = createSignal(false);
  createEffect(() => inTheater() && setOriginalHided(true));
  const hideOriginalHeader = useElementRef("#columns", {
    onMount: (it) => it?.classList.add(styles.HideToRight),
    onCleanup: (it) => {
      it?.classList.remove(styles.HideToRight);
      if (!inTheater() || p.pinned) return;
      setDisplayingPullTab(false);
      const refs = () => [it, getRef()];
      const callback = () => {
        setOriginalHided(true);
        setAllowPointerEvent(true);
        hideOriginalHeader.mount();
      };
      let innerClicked = false;
      const documentClick = (event: MouseEvent) => {
        const contained = refs().find((it) => it?.contains(event.target as HTMLElement));
        if (contained) {
          innerClicked = true;
          return;
        }
        callback();
        document.removeEventListener("click", documentClick);
      };
      document.addEventListener("click", documentClick);
      const onPointerLeave = (event: PointerEvent) => {
        const movedDest = document.elementFromPoint(event.x, event.y);
        const contained = refs().find((it) => it?.contains(movedDest as HTMLElement));
        console.log(movedDest);
        console.log(contained);
        if (innerClicked) return;
        if (contained) {
          contained?.addEventListener("pointerleave", onPointerLeave, { once: true });
          return;
        }
        callback();
      };
      it?.addEventListener("pointerleave", onPointerLeave, { once: true });
    },
    execBy: () =>  inTheater() && !p.pinned && originalHided(),
  });

  const nav = {
    description: "#columns #primary ytd-watch-metadata",
    chat: "#columns #secondary #chat-container",
    comments: "#columns #primary ytd-comments",
    playlist: "#columns #secondary ytd-playlist-panel-renderer",
    related: "#columns #secondary #related",
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
        class={clsx(styles.Resizer)}
        onPointerDown={(event) => {
          const ref = event.currentTarget;
          ref.setPointerCapture(event.pointerId);
          const onMove = (event: PointerEvent) => {
            const width = window.innerWidth - event.screenX;
            p.setSideSize(`${width}px`);
          };
          const onLeave = () => ref.removeEventListener("pointermove", onMove, false);
          ref.addEventListener("pointermove", onMove, false);
          ref.addEventListener("pointerup", onLeave, { once: false });
        }}
      />
      <Show when={!p.pinned}>
        <div
          class={styles.PullTabContainer}
          style={{
            "pointer-events": allowPointerEvent() ? "auto" : "none",
          }}
          onMouseMove={() => {
            setDisplayingPullTab(true);
            setAllowPointerEvent(false);
            setTimeout(() => {
              setDisplayingPullTab(false);
              setAllowPointerEvent(true);
            }, 2500);
          }}
        >
          <button
            class={clsx(
              styles.PullTab,
              !displayingPullTab() && styles.HideToRight
            )}
            onMouseEnter={() => {
              setOriginalHided(false);
              setAllowPointerEvent(false);
            }}
            onClick={() => {
              setOriginalHided(true);
              setAllowPointerEvent(true);
            }}
          >
            {originalHided()
              ? "<"
              : ">"
            }
          </button>
        </div>
      </Show>
      <div
        class={clsx(
          styles.Controls,
          !p.pinned && originalHided() && styles.HideToRight,
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
