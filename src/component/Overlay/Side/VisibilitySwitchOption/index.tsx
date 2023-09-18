import clsx from "clsx";
import {
  ComponentProps,
  JSX,
} from "solid-js";

import styles from "./VisibilitySwitchOption.module.styl";

import { useElementRef } from "@/fn/state/useElementRef";
import { useInTheater } from "@/fn/state/useInTheater";
import { stylx } from "@/fn/stylx";


export const VisibilitySwitchOption = (
  p: ComponentProps<"button">
  & {
    label: JSX.Element
    selector: string
    visible: boolean
  }
): JSX.Element => {
  const inTheater = useInTheater();
  useElementRef(() => p.selector, {
    onMount: (it) => it?.classList.add(styles.OptionalContent),
    onCleanup: (it) => it?.classList.remove(styles.OptionalContent),
    execBy: inTheater,
  });
  useElementRef(() => p.selector, {
    onMount: (it) => it?.classList.add(styles.Hidden),
    onCleanup: (it) => it?.classList.remove(styles.Hidden),
    execBy: () => inTheater() && !p.visible,
  });

  return (
    <button
      {...p}
      class={clsx(styles.VisibilitySwitchOption, p.class)}
      style={stylx(p.style)}
    >{p.label}</button>
  );
};
