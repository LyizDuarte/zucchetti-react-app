import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { UsersErrorState } from "./UsersErrorState";

const meta = {
  title: "Components/Users/UsersErrorState",
  component: UsersErrorState,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
  argTypes: {
    onRetry: { action: "retry" },
  },
} satisfies Meta<typeof UsersErrorState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    message: "Não foi possível carregar os usuários. Verifique sua conexão.",
    onRetry: fn(),
  },
};

export const ShortMessage: Story = {
  args: {
    message: "Erro ao carregar.",
    onRetry: fn(),
  },
};
