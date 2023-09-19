import { Signal, createEffect, onMount } from "solid-js";

export const makeStoraged = (
  key: string
) => <T>([get, set]: Signal<T>) => {
  onMount(() => {
    chrome.storage.local.get("pinned")
      .then((it) => set(it[key]));
    chrome.storage.local.onChanged.addListener((changes) => {
      const change = changes?.[key];
      if (change === undefined) return;
      set(() => change.newValue);
    });
  });
  createEffect(() => {
    chrome.storage.local.set({ [key]: get() });
  });
  return [get, set] as const;
};
