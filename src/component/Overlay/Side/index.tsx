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

  const [getRef, setRef] = createSignal<HTMLDivElement>();
  const size = createElementSize(getRef);
  createEffect(() => p.setSideSize(`${size.width}px`));

  const nav = {
    description: "#columns #primary ytd-watch-metadata",
    comments: "#columns #primary ytd-comments",
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
