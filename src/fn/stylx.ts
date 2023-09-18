import camelCase from "camelcase";
import {
  ComponentProps,
  JSX,
} from "solid-js";

export const stylx = (...style: ComponentProps<"div">["style"][]) => {
  return style
    .map((it) => {
      if (it === undefined)
        return {};
      if (typeof it === "string")
        return getStyleObjectFromString(it);
      return it;
    })
    .reduce((sum, it) => ({
      ...sum,
      ...it,
    }), {});
};

export const getStyleObjectFromString = (src: string) => {
  if (!src) { return {}; }
  return src.split(";").reduce((sum, pair) => {
    const [key, value] = pair.split(":");
    if (!key) return sum;

    const keyFormatted = camelCase(key.trim());
    return Object.assign(sum, {
      [keyFormatted]: value.trim(),
    });
  }, {} as JSX.CSSProperties);
};
