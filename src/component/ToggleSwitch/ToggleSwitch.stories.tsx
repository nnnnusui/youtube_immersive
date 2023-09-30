import { StoryObj, Meta } from "storybook-solidjs";

import { ToggleSwitch } from ".";

const meta: Meta<typeof ToggleSwitch> = {
  component: ToggleSwitch,
  args: {
    label: "toggler",
    value: true,
    setValue: () => {},
  },
};

export default meta;
type Story = StoryObj<typeof ToggleSwitch>;

export const Default: Story = {
};

export const Off: Story = {
  args: {
    value: false,
  },
};
