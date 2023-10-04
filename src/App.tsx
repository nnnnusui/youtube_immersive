import { type Component, createSignal, onMount } from "solid-js";

import styles from "./App.module.styl";
import { Input } from "./component/Input";
import { ToggleSwitch } from "./component/ToggleSwitch";
import { Persisted } from "./type/Persisted";

const App: Component = () => {
  const [storage, setStorage] = createSignal<Persisted>();
  onMount(async () => {
    setStorage(await chrome.storage.local.get() as Persisted);
  });
  onMount(() => {
    chrome.storage.local.onChanged.addListener((changes) => {
      const newValue = Object.fromEntries(
        Object.entries(changes)
          .map(([key, value]) => [key, value.newValue])
      ) as Persisted;
      setStorage((prev) => ({
        ...prev,
        ...newValue,
      }));
    });
  });

  return (
    <section class={styles.App}>
      <h1>Saved status</h1>
      <ToggleSwitch
        label={"Pinned"}
        value={storage()?.pinned ?? false}
        setValue={(value) => {
          chrome.storage.local.set({ pinned: value });
        }}
        thumbSize="12px"
      />
      <Input
        label={"Side Width"}
        value={storage()?.sideWidth ?? false}
        setValue={(value) => {
          chrome.storage.local.set({ sideWidth: value });
        }}
      />
      {/* <For each={Object.entries(storage()!)}>{([key, value]) =>
          <Input
            label={key}
            value={value}
            setValue={(value: any) => {
              chrome.storage.local.set({ [key]: value });
            }}
          />
        }</For> */}
    </section>
  );
};

export default App;
