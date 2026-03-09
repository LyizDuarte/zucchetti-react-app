import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import React from "react";
import type { User } from "../../types/User";
import { UsersProvider } from "../../contexts/UsersContext";
import { UserFormDialog } from "./UserFormDialog";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false },
  },
});

function withUsersProvider(Story: React.ComponentType) {
  return (
    <QueryClientProvider client={queryClient}>
      <UsersProvider>
        <Story />
      </UsersProvider>
    </QueryClientProvider>
  );
}

const user: User = {
  id: 1,
  name: "Maria Oliveira",
  email: "maria@exemplo.com",
  status: "active",
};

const meta = {
  title: "Components/Users/UserFormDialog",
  component: UserFormDialog,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  decorators: [withUsersProvider],
  argTypes: {
    onClose: { action: "fechado" },
  },
} satisfies Meta<typeof UserFormDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Closed: Story = {
  args: {
    open: false,
    onClose: fn(),
  },
};

export const OpenNewUser: Story = {
  args: {
    open: true,
    onClose: fn(),
  },
  parameters: {
    docs: {
      description: {
        story: "Formulário para cadastrar novo usuário.",
      },
    },
  },
};

export const OpenEditUser: Story = {
  args: {
    open: true,
    user,
    onClose: fn(),
  },
  parameters: {
    docs: {
      description: {
        story: "Formulário para editar usuário existente.",
      },
    },
  },
};
