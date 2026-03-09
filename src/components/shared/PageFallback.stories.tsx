import type { Meta, StoryObj } from "@storybook/react-vite";
import { PageFallback } from "./PageFallback";

const meta = {
  title: "Components/Shared/PageFallback",
  component: PageFallback,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
} satisfies Meta<typeof PageFallback>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
