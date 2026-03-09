import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { renderHook, act } from '@testing-library/react';
import { ThemeProvider, useThemeMode } from './ThemeContext';
import { getAppTheme } from '../theme/appTheme';

const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

jest.mock('@mui/material', () => {
  const actual = jest.requireActual<typeof import('@mui/material')>('@mui/material');
  return {
    ...actual,
    useMediaQuery: () => false,
  };
});

function createWrapper() {
  return function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <ThemeProvider>
        <MuiThemeProvider theme={getAppTheme('light')}>{children}</MuiThemeProvider>
      </ThemeProvider>
    );
  };
}

describe('ThemeContext', () => {
  beforeEach(() => {
    localStorageMock.clear();
  });

  it('retorna mode inicial "light" quando não há valor no localStorage', () => {
    const { result } = renderHook(() => useThemeMode(), {
      wrapper: createWrapper(),
    });

    expect(result.current.mode).toBe('light');
    expect(typeof result.current.toggleTheme).toBe('function');
  });

  it('retorna mode inicial "dark" quando localStorage contém "dark"', () => {
    localStorageMock.setItem('app-theme-mode', 'dark');

    const { result } = renderHook(() => useThemeMode(), {
      wrapper: createWrapper(),
    });

    expect(result.current.mode).toBe('dark');
  });

  it('alterna mode de light para dark ao chamar toggleTheme', () => {
    const { result } = renderHook(() => useThemeMode(), {
      wrapper: createWrapper(),
    });

    expect(result.current.mode).toBe('light');

    act(() => {
      result.current.toggleTheme();
    });

    expect(result.current.mode).toBe('dark');
  });

  it('alterna mode de dark para light ao chamar toggleTheme duas vezes', () => {
    const { result } = renderHook(() => useThemeMode(), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.toggleTheme();
    });
    expect(result.current.mode).toBe('dark');

    act(() => {
      result.current.toggleTheme();
    });
    expect(result.current.mode).toBe('light');
  });

  it('persiste o mode no localStorage ao chamar toggleTheme', () => {
    const { result } = renderHook(() => useThemeMode(), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.toggleTheme();
    });

    expect(localStorageMock.getItem('app-theme-mode')).toBe('dark');

    act(() => {
      result.current.toggleTheme();
    });

    expect(localStorageMock.getItem('app-theme-mode')).toBe('light');
  });

  it('lança erro quando useThemeMode é usado fora de ThemeProvider', () => {
    expect(() => {
      renderHook(() => useThemeMode());
    }).toThrow('useThemeMode deve ser usado dentro de ThemeProvider');
  });
});
