import {
  JSX,
  Show,
  createEffect,
  createSignal,
  onMount,
} from "solid-js";

import { Header } from "./Header";
import { Main } from "./Main";
import styles from "./Overlay.module.styl";
import { Side } from "./Side";

import { querySelectHtmlElementsAsync } from "@/fn/querySelectHtmlElements";
import { usePromisesAsync } from "@/fn/usePromisesAsync";

export const Overlay = (): JSX.Element => {
  const [inTheater, setInTheater] = createSignal(false);
  onMount(() => {
    usePromisesAsync(() => setInTheater(true), [
      querySelectHtmlElementsAsync("#full-bleed-container #player-container"),
    ]);
    usePromisesAsync((it) => it.classList.add(styles.YouTubeImmersive), [
      querySelectHtmlElementsAsync("body"),
    ]);
  });

  const [pinned, setPinned] = createSignal(false);
  const [sideSize, setSideSize] = createSignal("25vw");
  createEffect(() => {
    usePromisesAsync((it) => it.style.setProperty("--youtube-immersive--side-size", sideSize()), [
      querySelectHtmlElementsAsync("body"),
    ]);
  });

  return (
    <div
      class={ styles.Overlay }
    >
      <Show when={inTheater()}>
        <Header class={styles.Header} />
        <Main
          class={styles.Main}
          pinned={pinned()}
        />
        <Side
          class={styles.Side}
          setPinned={setPinned}
          setSideSize={setSideSize}
        />
      </Show>
    </div>
  );
};
