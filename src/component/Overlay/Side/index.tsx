import { createElementSize } from "@solid-primitives/resize-observer";
import clsx from "clsx";
import {
  ComponentProps,
  JSX,
  Setter,
  createEffect,
  createSignal, For,
} from "solid-js";

import styles from "./Side.module.styl";
import { VisibilitySwitchOption } from "./VisibilitySwitchOption";

import { useElementRef } from "@/fn/state/useElementRef";
import { useInTheater } from "@/fn/state/useInTheater";

export const Side = (
  p: ComponentProps<"div">
  & {
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
  useElementRef("ytd-text-inline-expander", {
    onMount: (it) => it?.setAttribute("is-expanded", ""),
    onCleanup: (it) => it?.removeAttribute("is-expanded"),
    execBy: inTheater,
  });
  useElementRef("ytd-live-chat-frame", {
    onMount: (it) => it?.removeAttribute("collapsed"),
    execBy: inTheater,
  });

  const [getRef, setRef] = createSignal<HTMLDivElement>();
  const size = createElementSize(getRef);
  createEffect(() => p.setSideSize(`${size.width}px`));

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
      class={clsx(p.class, styles.Side)}
      ref={setRef}
    >
      <button
        class={styles.PinButton}
        onClick={() => p.setPinned((prev) => !prev)}
      >
        📌
      </button>
      <For each={Object.entries(nav)}>{([name, selector]) => (
        <VisibilitySwitchOption
          label={<>{name}</>}
          selector={selector}
          visible={name === visibleNav()}
          onClick={() => setVisibleNav(name)}
        />
      )}</For>
    </div>
  );
};
