/* eslint-disable react-refresh/only-export-components */
import * as React from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { readPreference, writePreference } from "@/lib/storage";

type Theme = "dark" | "light" | "system";
type ThemeProviderState = {
  theme: Theme;
  resolvedTheme: "dark" | "light";
  setTheme: (theme: Theme) => void;
};
const ThemeProviderContext = React.createContext<ThemeProviderState | undefined>(undefined);

export function ThemeProvider({ children, defaultTheme = "dark", storageKey = "vite-ui-theme" }: {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}) {
  const [theme, updateTheme] = React.useState<Theme>(() => {
    const saved = readPreference(storageKey);
    return saved === "dark" || saved === "light" || saved === "system" ? saved : defaultTheme;
  });
  const systemDark = useMediaQuery("(prefers-color-scheme: dark)");
  const resolvedTheme = theme === "system" ? (systemDark ? "dark" : "light") : theme;
  React.useLayoutEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(resolvedTheme);
    root.style.colorScheme = resolvedTheme;
  }, [resolvedTheme]);
  const setTheme = React.useCallback((next: Theme) => {
    writePreference(storageKey, next);
    updateTheme(next);
  }, [storageKey]);
  const value = React.useMemo(() => ({ theme, resolvedTheme, setTheme }), [theme, resolvedTheme, setTheme]);
  return <ThemeProviderContext.Provider value={value}>{children}</ThemeProviderContext.Provider>;
}

export function useTheme() {
  const context = React.useContext(ThemeProviderContext);
  if (!context) throw new Error("useTheme must be used within a ThemeProvider");
  return context;
}
