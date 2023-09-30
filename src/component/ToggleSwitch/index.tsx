import clsx from "clsx";
import {
  JSX,
} from "solid-js";

import styles from "./ToggleSwitch.module.styl";

import { stylx } from "@/fn/stylx";

export const ToggleSwitch = (
  p: {
    label: string
    value: boolean
    setValue: (value: boolean) => void
    thumbSize?: string
  }
): JSX.Element => {

  return (
    <label
      class={clsx(styles.ToggleSwitch)}
      style={stylx({
        "--thumb-size": p.thumbSize ?? "16px",
      })}
    >
      <div>{p.label}</div>
      <input
        class={clsx(styles.Input)}
        type="checkbox"
        checked={p.value}
        onInput={(event) => p.setValue(event.currentTarget.checked)}
      />
      <div class={styles.Slider}>
        <div class={styles.Thumb} />
      </div>
    </label>
  );
};
