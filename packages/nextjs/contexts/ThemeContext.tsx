"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useMediaQuery } from "usehooks-ts";

type Theme = "light" | "dark";
type ThemeComplex = Theme | "system";

interface ThemeContextType {
  theme: ThemeComplex;
  setTheme: (theme: ThemeComplex | "user") => void;
  userTheme: Theme;
  setUserTheme: (theme: Theme) => void;
  resolvedTheme: Theme;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const getSafeItem = (key: string, fallback: string): string => {
  const value = window.localStorage.getItem(key);
  return value ? value : fallback;
};

type ThemeProviderProps = {
  children: React.ReactNode;
};

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<ThemeComplex>("system");
  const [userTheme, setUserTheme] = useState<Theme>("light");
  const isSystemDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [resolvedTheme, setResolvedTheme] = useState(userTheme);
  console.log(resolvedTheme);

  //Initializer
  useEffect(() => {
    let storedUserTheme = getSafeItem("user-theme", "light");
    setUserTheme(() => {
      if (storedUserTheme) {
        return storedUserTheme as Theme;
      } else {
        // Initialize userTheme with systemTheme if not present in local storage
        const systemTheme: Theme = isSystemDarkMode ? "dark" : "light";
        window.localStorage.setItem("user-theme", systemTheme);
        storedUserTheme = systemTheme;
        return systemTheme;
      }
    });
    setTheme(() => {
      const storedTheme = getSafeItem("theme", "system");
      if (storedTheme) {
        return storedTheme as Theme;
      } else {
        window.localStorage.setItem("theme", "system");
        return storedUserTheme as Theme;
      }
    });
  }, []);

  useEffect(() => {
    if (theme === "system") {
      setResolvedTheme(isSystemDarkMode ? "dark" : "light");
      return;
    }
    setResolvedTheme(theme);
  }, [isSystemDarkMode, userTheme, theme]);

  const updateUserTheme = (value: Theme) => {
    setUserTheme(value);
    window.localStorage.setItem("user-theme", value);
  };

  // Update theme when userTheme changes.
  useEffect(() => {
    theme !== "system" && updateTheme(userTheme);
  }, [userTheme]);

  const updateTheme = (value: ThemeComplex | "user") => {
    const theme: ThemeComplex = value === "user" ? userTheme : value;
    setTheme(theme);
    window.localStorage.setItem("theme", theme);
  };

  // Update userTheme when theme changes.
  useEffect(() => {
    theme !== "system" && updateUserTheme(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{
        theme: "light",
        setTheme: value => updateTheme(value),
        userTheme: "light",
        setUserTheme: value => updateUserTheme(value),
        resolvedTheme: "light",
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = (): ThemeContextType => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
  return ctx;
};

export default useTheme;
