import { createElementSize } from "@solid-primitives/resize-observer";
import clsx from "clsx";
import {
  ComponentProps,
  JSX,
  createEffect,
  createSignal,
  onMount, For,
} from "solid-js";

import styles from "./Side.module.styl";
import { VisibilitySwitchOption } from "./VisibilitySwitchOption";

import { querySelectHtmlElementsAsync } from "@/fn/querySelectHtmlElements";
import { usePromisesAsync } from "@/fn/usePromisesAsync";

export const Side = (
  p: ComponentProps<"div">
  & {
    setPinned: (pinned: boolean) => VideoDecoderConfig
    setSideSize: (sideSize: string) => void
  }
): JSX.Element => {
  onMount(() => {
    usePromisesAsync((it) => it.classList.add(styles.OverrideOriginal), [
      querySelectHtmlElementsAsync("#columns"),
    ]);
    usePromisesAsync((it) => it.classList.add(styles.Below), [
      querySelectHtmlElementsAsync("#columns #below"),
    ]);
  });

  const [pinned, setPinned] = createSignal(false);
  createEffect(() => {
    p.setPinned(pinned());
  });
  const [getRef, setRef] = createSignal<HTMLDivElement>();
  const size = createElementSize(getRef);
  createEffect(() => {
    const ref = getRef();
    if (!ref) return;
    p.setSideSize(`${size.width}px`);
  });

  const nav = {
    description: "#columns #primary",
    related: "#columns #secondary",
  };
  const [visibleNav, setVisibleNav] = createSignal("description");

  return (
    <div
      class={clsx(p.class, styles.Side)}
      ref={setRef}
    >
      <button
        class={styles.PinButton}
        onClick={() => setPinned((prev) => !prev)}
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
