import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { UsersPageHeader } from "./UsersPageHeader";

const meta = {
  title: "Components/Users/UsersPageHeader",
  component: UsersPageHeader,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
  argTypes: {
    onToggleTheme: { action: "toggleTheme" },
  },
} satisfies Meta<typeof UsersPageHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {
    mode: "light",
    onToggleTheme: fn(),
  },
};

export const Dark: Story = {
  args: {
    mode: "dark",
    onToggleTheme: fn(),
  },
  parameters: {
    backgrounds: { default: "dark" },
  },
};
