
import { Signal } from "solid-js";

import { UseElementRefArgs, useElementRef } from "./useElementRef";

const prefix = "--youtube-immersive--";
export const makeCssVariable = (
  name: string,
  options?: UseElementRefArgs["options"]
) => <T>([get, set]: Signal<T>): Signal<T> => {
  useElementRef("html", {
    onMount: (it) => options?.onMount?.(it) ?? it?.style.setProperty(`${prefix}${name}`, `${get()}`),
    onCleanup: (it) => options?.onCleanup?.(it) ?? it?.style.removeProperty(`${prefix}${name}`),
    execBy: options?.execBy ?? (() => true),
  });
  return [get, set];
};
