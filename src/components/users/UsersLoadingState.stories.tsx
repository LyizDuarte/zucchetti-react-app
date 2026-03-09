import type { Meta, StoryObj } from "@storybook/react-vite";
import { UsersLoadingState } from "./UsersLoadingState";

const meta = {
  title: "Components/Users/UsersLoadingState",
  component: UsersLoadingState,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
} satisfies Meta<typeof UsersLoadingState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
