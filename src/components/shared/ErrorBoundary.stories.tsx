import type { Meta, StoryObj } from "@storybook/react-vite";
import { ErrorBoundary } from "./ErrorBoundary";

function ThrowError({ shouldThrow }: { shouldThrow: boolean }) {
  if (shouldThrow) throw new Error("Erro de exemplo");
  return <span>Conteúdo renderizado com sucesso</span>;
}

const meta = {
  title: "Components/Shared/ErrorBoundary",
  component: ErrorBoundary,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof ErrorBoundary>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <ThrowError shouldThrow={false} />,
  },
};

export const WithError: Story = {
  args: {
    children: <ThrowError shouldThrow />,
  },
  parameters: {
    docs: {
      description: {
        story: "Exibe a UI de fallback quando um filho lança erro. O botão 'Tentar novamente' reseta o estado.",
      },
    },
  },
};
