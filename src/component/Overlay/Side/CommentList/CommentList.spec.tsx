import { composeStories } from "@storybook/react";
import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";

import styles from "./CommentList.module.scss";
import * as stories from "./CommentList.stories";

const story = composeStories(stories);

describe("<CommentList /> test", () => {
  const { container } = render(<story.Default />);
  const component = container.firstChild as HTMLElement;
  it("描画可能", async () => {
    expect(component).toBeInTheDocument();
  });
  it("CSS-Module class を持つ", async () => {
    expect(component.classList.contains(styles.CommentList)).toBe(true);
  });
});
