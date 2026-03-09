import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import type { User } from "../../types/User";
import { UsersTable } from "./UsersTable";

const users: User[] = [
  { id: 1, name: "Ana Santos", email: "ana@exemplo.com", status: "active" },
  { id: 2, name: "Bruno Costa", email: "bruno@exemplo.com", status: "inactive" },
  { id: 3, name: "Carla Lima", email: "carla@exemplo.com", status: "active" },
];

const meta = {
  title: "Components/Users/UsersTable",
  component: UsersTable,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
  argTypes: {
    onEdit: { action: "editar" },
    onDelete: { action: "excluir" },
  },
} satisfies Meta<typeof UsersTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithUsers: Story = {
  args: {
    users,
    onEdit: fn(),
    onDelete: fn(),
  },
};

export const Empty: Story = {
  args: {
    users: [],
    onEdit: fn(),
    onDelete: fn(),
  },
};
