import { Signal, createEffect, on, onMount } from "solid-js";

export const makeStoraged = (
  key: string
) => <T>([get, set]: Signal<T>): Signal<T> => {
  onMount(() => {
    chrome.storage.local.get(key)
      .then((it) => {
        set((prev) => it[key] ?? prev);
      });
  });
  createEffect((on(
    get,
    (value) => {
      chrome.storage.local.set({ [key]: value });
    },
    { defer: true }
  )));
  return [get, set];
};
