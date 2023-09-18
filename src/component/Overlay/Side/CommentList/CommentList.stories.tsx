import type { Meta, StoryObj } from "@storybook/react";

import { CommentList } from ".";

const meta: Meta<typeof CommentList> = {
  component: CommentList,
};

export default meta;
type Story = StoryObj<typeof CommentList>;

export const Default: Story = {
};
