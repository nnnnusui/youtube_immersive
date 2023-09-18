import {
  JSX,
  Show,
  createEffect,
  createSignal,
} from "solid-js";

import { Header } from "./Header";
import { Main } from "./Main";
import styles from "./Overlay.module.styl";
import { Side } from "./Side";

import { querySelectHtmlElementsAsync } from "@/fn/querySelectHtmlElements";
import { useElementRef } from "@/fn/state/useElementRef";
import { useInTheater } from "@/fn/state/useInTheater";
import { usePromisesAsync } from "@/fn/usePromisesAsync";

export const Overlay = (): JSX.Element => {
  const inTheater = useInTheater();
  useElementRef("body", {
    onMount: (it) => it?.classList.add(styles.YouTubeImmersive),
    onCleanup: (it) => it?.classList.remove(styles.YouTubeImmersive),
    execBy: inTheater,
  });

  const [headerSize, setHeaderSize] = createSignal("");
  createEffect(() => {
    const size = headerSize();
    usePromisesAsync((it) => it.style.setProperty("--youtube-immersive--header-size", size), [
      querySelectHtmlElementsAsync("body"),
    ]);
  });
  const [pinned, setPinned] = createSignal(true);
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
        <Main
          class={styles.Main}
          pinned={pinned()}
        />
        <Side
          class={styles.Side}
          pinned={pinned()}
          setPinned={setPinned}
          setSideSize={setSideSize}
        />
        <Header
          class={styles.Header}
          setHeaderHeight={setHeaderSize}
        />
      </Show>
    </div>
  );
};
