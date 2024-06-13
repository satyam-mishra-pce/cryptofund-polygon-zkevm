"use client";

import { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import useTheme from "~~/contexts/ThemeContext";

export const SwitchTheme = ({ className }: { className?: string }) => {
  const { setUserTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const isDarkMode = resolvedTheme === "dark";

  const handleToggle = () => {
    if (isDarkMode) {
      setUserTheme("light");
      return;
    }
    setUserTheme("dark");
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className={`flex space-x-2 h-8 items-center justify-center text-sm ${className}`}>
      <input
        id="theme-toggle"
        type="checkbox"
        className="toggle toggle-primary bg-primary hover:bg-primary border-primary"
        onChange={handleToggle}
        checked={isDarkMode}
      />
      {
        <label htmlFor="theme-toggle" className={`swap swap-rotate ${!isDarkMode ? "swap-active" : ""}`}>
          <SunIcon className="swap-on h-5 w-5" />
          <MoonIcon className="swap-off h-5 w-5" />
        </label>
      }
    </div>
  );
};
