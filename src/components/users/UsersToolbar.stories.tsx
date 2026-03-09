import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { UsersToolbar } from "./UsersToolbar";

const meta = {
  title: "Components/Users/UsersToolbar",
  component: UsersToolbar,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
  argTypes: {
    onSearchChange: { action: "searchChange" },
    onOrderChange: { action: "orderChange" },
    onNewUser: { action: "newUser" },
  },
} satisfies Meta<typeof UsersToolbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    search: "",
    order: "asc",
    onSearchChange: fn(),
    onOrderChange: fn(),
    onNewUser: fn(),
  },
};

export const WithSearch: Story = {
  args: {
    search: "Ana",
    order: "asc",
    onSearchChange: fn(),
    onOrderChange: fn(),
    onNewUser: fn(),
  },
};

export const SortDescending: Story = {
  args: {
    search: "",
    order: "desc",
    onSearchChange: fn(),
    onOrderChange: fn(),
    onNewUser: fn(),
  },
};
