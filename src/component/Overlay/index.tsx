import {
  JSX,
  Show,
  createEffect,
  createSignal,
  onMount,
} from "solid-js";

import { Header } from "./Header";
import styles from "./Overlay.module.styl";

import { querySelectHtmlElementsAsync } from "@/fn/querySelectHtmlElements";
import { useInTheater } from "@/fn/state/useInTheater";
import { usePromisesAsync } from "@/fn/usePromisesAsync";

export const Overlay = (): JSX.Element => {
  const [inTheater] = useInTheater();
  onMount(() => {
    usePromisesAsync((it) => it.classList.add(styles.YouTubeImmersive), [
      querySelectHtmlElementsAsync("body"),
    ]);
  });

  const [pinned, setPinned] = createSignal(false);
  const [sideSize, setSideSize] = createSignal("");
  createEffect(() => {
    const size = sideSize();
    usePromisesAsync((it) => it.style.setProperty("--youtube-immersive--side-size", size), [
      querySelectHtmlElementsAsync("body"),
    ]);
  });
  createEffect(() => console.log(inTheater() ? "inTheater" : "not in theater"));

  return (
    <div
      class={ styles.Overlay }
    >
      <Show when={inTheater()}>
        {/* <Main
          class={styles.Main}
          pinned={pinned()}
        />
        <Side
          class={styles.Side}
          setPinned={setPinned}
          setSideSize={setSideSize}
        /> */}
        <Header class={styles.Header} />
      </Show>
    </div>
  );
};
