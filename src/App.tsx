import './App.css';

import { App as AppProvider, ConfigProvider, theme as ThemeConfig } from 'antd';
import { useCallback, useEffect } from 'react';

import { COLOR } from './data/constant';
import useThemeStore from './hooks/zustand-store/use-theme-store';
import Routes from './routes';

function App() {
  const theme = useThemeStore((state) => state.theme);
  const setTheme = useThemeStore((state) => state.setTheme);

  // const { t, i18n } = useTranslation();

  const setThemeState = useCallback(
    (dark = true) => {
      setTheme({
        theme: dark ? 'dark' : 'light',
      });
    },
    [setTheme]
  );

  const matchMode = useCallback(
    (e: MediaQueryListEvent) => {
      setThemeState(e.matches);
    },
    [setThemeState]
  );

  useEffect(() => {
    setThemeState(theme === 'dark');

    // watch system theme change
    if (!localStorage.getItem('theme')) {
      const mql = window.matchMedia('(prefers-color-scheme: dark)');

      mql.addEventListener('change', matchMode);
    }
  }, [matchMode, setThemeState, theme]);

  return (
    <div className="App">
      <ConfigProvider
        componentSize="middle"
        theme={{
          token: {
            colorPrimary:
              COLOR[theme === 'dark' ? 'DARK_PRIMARY' : 'LIGHT_PRIMARY'],
            // fontFamily: 'Optima VU',
          },
          algorithm:
            theme === 'dark'
              ? ThemeConfig.darkAlgorithm
              : ThemeConfig.defaultAlgorithm,
        }}
      >
        <AppProvider className="h-full">
          <Routes />
        </AppProvider>
      </ConfigProvider>
    </div>
  );
}

export default App;
