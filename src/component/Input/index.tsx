import {
  JSX,
} from "solid-js";

import styles from "./Input.module.styl";


export const Input = <T,>(
  p: {
    label: JSX.Element
    value: T
    setValue: (value: string) => void
  }
): JSX.Element => {

  return (
    <label
      class={styles.Input}
    >
      <div>{p.label}</div>
      <input type="text"
        value={`${p.value}`}
        onInput={(event) => p.setValue(event.currentTarget.value)}
      />
    </label>
  );
};
