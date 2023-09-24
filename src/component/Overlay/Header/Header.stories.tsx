import { createSignal } from "solid-js";
import { StoryObj, Meta } from "storybook-solidjs";

import { Header } from ".";

const [, setSuppressClickCallback] = createSignal<{ callback: () => void }>();
const meta: Meta<typeof Header> = {
  component: Header,
  args: {
    inTheater: true,
    setHeaderHeight: () => {},
    setSuppressClickCallback: setSuppressClickCallback,
    style: {
      background: "rgba(0, 0, 100, .1)",
    },
  },
  decorators: [
    (Story) => (
      <div>
        <div id="masthead-container"
          style={{
            position: "absolute",
            width: "100%",
            height: "50px",
            background: "rgba(255, 0, 0, .2)",
          }}
        />
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Header>;

export const Default: Story = {
};
