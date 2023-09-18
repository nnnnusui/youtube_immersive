import {
  JSX, onMount,
} from "solid-js";

import { Header } from "./Header";
import { Main } from "./Main";
import styles from "./Overlay.module.styl";
import { Side } from "./Side";

import { querySelectHtmlElementsAsync } from "@/fn/querySelectHtmlElements";
import { setCssClassAsync } from "@/fn/setCssClassAsync";

export const Overlay = (): JSX.Element => {
  onMount(() => {
    setCssClassAsync(styles.TransparentOverride, [
      querySelectHtmlElementsAsync("#masthead-container #background"),
    ]);
    setCssClassAsync(styles.IgnoreHeaderMargin, [
      querySelectHtmlElementsAsync("#page-manager"),
    ]);
    setCssClassAsync(styles.UnsetSpacing, [
      querySelectHtmlElementsAsync("#primary"),
    ]);
    // setCssClassAsync(styles.UnsetRelative, [
    //   querySelectHtmlElementsAsync("#columns #below"),
    // ]);
  });

  return (
    <div
      class={ styles.Overlay }
    >
      <Header class={styles.Header} />
      <Main class={styles.Main} />
      <Side class={styles.Side} />
    </div>
  );
};
