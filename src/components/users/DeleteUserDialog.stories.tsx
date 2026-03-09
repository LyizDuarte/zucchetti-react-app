import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import type { User } from "../../types/User";
import { DeleteUserDialog } from "./DeleteUserDialog";

const user: User = {
  id: 1,
  name: "João Silva",
  email: "joao@exemplo.com",
  status: "active",
};

const meta = {
  title: "Components/Users/DeleteUserDialog",
  component: DeleteUserDialog,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    onCancel: { action: "cancelado" },
    onConfirm: { action: "confirmado" },
  },
} satisfies Meta<typeof DeleteUserDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Closed: Story = {
  args: {
    open: false,
    user,
    onCancel: fn(),
    onConfirm: fn(),
  },
};

export const Open: Story = {
  args: {
    open: true,
    user,
    onCancel: fn(),
    onConfirm: fn(),
  },
};

export const OpenWithoutUser: Story = {
  args: {
    open: true,
    user: null,
    onCancel: fn(),
    onConfirm: fn(),
  },
};
