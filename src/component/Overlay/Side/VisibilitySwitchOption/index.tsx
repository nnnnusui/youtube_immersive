import clsx from "clsx";
import {
  ComponentProps,
  JSX,
  createEffect,
  createSignal,
  onMount,
} from "solid-js";

import styles from "./VisibilitySwitchOption.module.styl";

import { querySelectHtmlElementsAsync } from "@/fn/querySelectHtmlElements";
import { stylx } from "@/fn/stylx";
import { usePromisesAsync } from "@/fn/usePromisesAsync";


export const VisibilitySwitchOption = (
  p: ComponentProps<"button">
  & {
    label: JSX.Element
    selector: string
    visible: boolean
  }
): JSX.Element => {
  const [getElement, setElement] = createSignal<HTMLElement>();
  onMount(() => {
    usePromisesAsync((it) => {
      it.classList.add(styles.OptionContent);
      setElement(it);
    }, [
      querySelectHtmlElementsAsync(p.selector),
    ]);
  });
  createEffect(() => {
    const element = getElement();
    if (!element) return;
    p.visible
      ? element.classList.remove(styles.Hidden)
      : element.classList.add(styles.Hidden);
  });

  return (
    <button
      {...p}
      class={clsx(styles.VisibilitySwitchOption, p.class)}
      style={stylx(p.style)}
    >{p.label}</button>
  );
};
