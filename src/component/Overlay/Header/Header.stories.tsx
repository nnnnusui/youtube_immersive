import { StoryObj, Meta } from "storybook-solidjs";

import { Header } from ".";

const meta: Meta<typeof Header> = {
  component: Header,
  args: {
    setHeaderHeight: () => {},
  },
};

export default meta;
type Story = StoryObj<typeof Header>;

export const Default: Story = {
};
