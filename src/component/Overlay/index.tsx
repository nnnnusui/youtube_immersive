import {
  JSX,
  Show,
  createSignal,
} from "solid-js";

import { Header } from "./Header";
import { Main } from "./Main";
import styles from "./Overlay.module.styl";
import { Side } from "./Side";

import { makeCssVariable } from "@/fn/state/makeCssVariable";
import { makeStoraged } from "@/fn/state/makeStoraged";
import { useElementRef } from "@/fn/state/useElementRef";
import { useInTheater } from "@/fn/state/useInTheater";

export const Overlay = (): JSX.Element => {
  const inTheater = useInTheater();
  useElementRef("body", {
    onMount: (it) => it?.classList.add(styles.YouTubeImmersive),
    onCleanup: (it) => it?.classList.remove(styles.YouTubeImmersive),
    execBy: inTheater,
  });

  const [pinned, setPinned] = makeStoraged("pinned")(createSignal(false));
  const [, setHeaderSize] = makeCssVariable("header-size")(createSignal(""));
  const [, setSideWidth] = makeStoraged("sideWidth")(makeCssVariable("side-width")(createSignal("750px")));
  makeCssVariable("side-bottom", { execBy: () => !pinned() })(createSignal("150px"));

  return (
    <div
      class={ styles.Overlay }
    >
      <Show when={inTheater()}>
        <Header
          class={styles.Header}
          setHeaderHeight={setHeaderSize}
        />
        <Main
          class={styles.Main}
          pinned={pinned()}
        />
        <Side
          class={styles.Side}
          pinned={pinned()}
          setPinned={setPinned}
          setSideWidth={setSideWidth}
        />
      </Show>
    </div>
  );
};
