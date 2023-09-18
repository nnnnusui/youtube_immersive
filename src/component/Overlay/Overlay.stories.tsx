import type { Meta, StoryObj } from "@storybook/react";

import { Overlay } from ".";

const meta: Meta<typeof Overlay> = {
  component: Overlay,
};

export default meta;
type Story = StoryObj<typeof Overlay>;

export const Default: Story = {
};
