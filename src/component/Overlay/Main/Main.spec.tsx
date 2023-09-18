import { composeStories } from "@storybook/react";
import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";

import styles from "./Main.module.scss";
import * as stories from "./Main.stories";

const story = composeStories(stories);

describe("<Main /> test", () => {
  const { container } = render(<story.Default />);
  const component = container.firstChild as HTMLElement;
  it("描画可能", async () => {
    expect(component).toBeInTheDocument();
  });
  it("CSS-Module class を持つ", async () => {
    expect(component.classList.contains(styles.Main)).toBe(true);
  });
});
