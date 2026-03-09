import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ErrorBoundary } from './ErrorBoundary';
import { getAppTheme } from '../theme/appTheme';

const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

function ThrowError({ shouldThrow }: { shouldThrow: boolean }) {
  if (shouldThrow) throw new Error('Erro de teste');
  return <span>Conteúdo ok</span>;
}

function Wrapper({ children }: { children: React.ReactNode }) {
  return <MuiThemeProvider theme={getAppTheme('light')}>{children}</MuiThemeProvider>;
}

describe('ErrorBoundary', () => {
  afterAll(() => {
    consoleSpy.mockRestore();
  });

  it('renderiza os filhos quando não há erro', () => {
    render(
      <Wrapper>
        <ErrorBoundary>
          <ThrowError shouldThrow={false} />
        </ErrorBoundary>
      </Wrapper>,
    );

    expect(screen.getByText('Conteúdo ok')).toBeInTheDocument();
  });

  it('renderiza a UI de fallback quando um filho lança erro', () => {
    render(
      <Wrapper>
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      </Wrapper>,
    );

    expect(screen.getByText('Algo deu errado')).toBeInTheDocument();
    expect(screen.getByText(/Ocorreu um erro inesperado/)).toBeInTheDocument();
    expect(screen.getByText('Erro de teste')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /tentar novamente/i })).toBeInTheDocument();
  });

  it('exibe o botão Tentar novamente e reseta o estado ao clicar', async () => {
    const user = userEvent.setup();
    render(
      <Wrapper>
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      </Wrapper>,
    );

    const retryButton = screen.getByRole('button', { name: /tentar novamente/i });
    expect(retryButton).toBeInTheDocument();

    await user.click(retryButton);

    expect(screen.getByText('Algo deu errado')).toBeInTheDocument();
  });
});
