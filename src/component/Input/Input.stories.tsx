import { StoryObj, Meta } from "storybook-solidjs";

import { Input } from ".";

const meta: Meta<typeof Input> = {
  component: Input,
  args: {
    label: "testLabel",
    value: "testValue",
    setValue: () => {},
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
};
