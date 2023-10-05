import clsx from "clsx";
import {
  ComponentProps,
  JSX,
  Show,
} from "solid-js";

import { SideViewOption } from "./SideViewOption";
import styles from "./VisibilitySwitchOption.module.styl";

import { useElementRef } from "@/fn/state/useElementRef";
import { useInTheater } from "@/fn/state/useInTheater";
import { stylx } from "@/fn/stylx";

export const VisibilitySwitchOption = (
  p: ComponentProps<"button">
  & {
    label: JSX.Element
    viewOption: SideViewOption
    visible: boolean
  }
): JSX.Element => {
  const inTheater = useInTheater();
  useElementRef(() => p.viewOption.target, {
    onMount: (it) => it?.classList.add(styles.OptionalContent),
    onCleanup: (it) => it?.classList.remove(styles.OptionalContent),
    execBy: inTheater,
  });
  useElementRef(() => p.viewOption.target, {
    onMount: (it) => it?.classList.add(styles.Hidden),
    onCleanup: (it) => it?.classList.remove(styles.Hidden),
    execBy: () => inTheater() && !p.visible,
  });
  const mustExistRef = useElementRef(() => p.viewOption.mustExist, { execBy: inTheater });

  return (
    <Show when={mustExistRef.ref()}>
      <button
        {...p}
        class={clsx(
          styles.VisibilitySwitchOption,
          p.class,
          p.visible && styles.Visible
        )}
        style={stylx(p.style)}
      >{p.label}</button>
    </Show>
  );
};
