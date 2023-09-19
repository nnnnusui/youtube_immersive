import { SignalOptions, createEffect, createSignal } from "solid-js";

import { UseElementRefArgs, useElementRef } from "./useElementRef";

const prefix = "--youtube-immersive--";
export const createCssVariableSignal = <T>(
  init: T | (() => T),
  variableName: string,
  options?: SignalOptions<T>
    & UseElementRefArgs["options"]
) => {
  const initValue = () => init instanceof Function ? init() : init;
  const [get, set] = createSignal<T>(initValue(), options);
  createEffect(() => set(() => initValue()));

  useElementRef("body", {
    onMount: (it) => options?.onMount?.(it) ?? it?.style.setProperty(`${prefix}${variableName}`, `${get()}`),
    onCleanup: (it) => options?.onCleanup?.(it) ?? it?.style.removeProperty(`${prefix}${variableName}`),
    execBy: options?.execBy ?? (() => true),
  });

  return [get, set] as const;
};
