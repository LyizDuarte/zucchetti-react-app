import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import type { Preview } from "@storybook/react-vite";
import React from "react";
import { getAppTheme } from "../src/theme/appTheme";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: "todo",
    },
  },
  decorators: [
    (Story) => (
      <MuiThemeProvider theme={getAppTheme("light")}>
        <CssBaseline />
        <Story />
      </MuiThemeProvider>
    ),
  ],
};

export default preview;
