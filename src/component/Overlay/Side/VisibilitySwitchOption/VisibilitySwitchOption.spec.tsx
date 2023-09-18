import { composeStories } from "@storybook/react";
import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";

import styles from "./VisibilitySwitchOption.module.scss";
import * as stories from "./VisibilitySwitchOption.stories";

const story = composeStories(stories);

describe("<VisibilitySwitchOption /> test", () => {
  const { container } = render(<story.Default />);
  const component = container.firstChild as HTMLElement;
  it("描画可能", async () => {
    expect(component).toBeInTheDocument();
  });
  it("CSS-Module class を持つ", async () => {
    expect(component.classList.contains(styles.VisibilitySwitchOption)).toBe(true);
  });
});
