import {
  JSX,
  Show,
  createSignal,
} from "solid-js";

import { Header } from "./Header";
import { Main } from "./Main";
import styles from "./Overlay.module.styl";
import { Side } from "./Side";

import { createCssVariableSignal } from "@/fn/state/createCssVariableSignal";
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
  const [, setHeaderSize] = createCssVariableSignal("", "header-size");
  const [, setSideSize] = createCssVariableSignal("750px", "side-size");
  createCssVariableSignal("150px", "side-bottom", { execBy: () => !pinned() });

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
          setSideSize={setSideSize}
        />
      </Show>
    </div>
  );
};
