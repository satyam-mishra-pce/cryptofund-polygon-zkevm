"use client";

import React, { useState } from "react";
import useTheme from "~~/contexts/ThemeContext";

const Settings = () => {
  const { theme, userTheme, setTheme, setUserTheme, resolvedTheme } = useTheme();
  const [value1, setValue1] = useState(theme === "system");
  const [dark, setDark] = useState(true);

  console.log(theme, userTheme, resolvedTheme);
  return (
    <div>
      <input
        type="checkbox"
        checked={value1}
        onChange={evt => {
          const isChecked = evt.target.checked;
          setValue1(isChecked);
          setTheme(isChecked ? "system" : "user");
        }}
      />
      Use System Theme
      <br />
      <input
        type="checkbox"
        checked={dark}
        onChange={evt => {
          const isChecked = evt.target.checked;
          setDark(isChecked);
          setUserTheme(isChecked ? "dark" : "light");
        }}
      />
      Dark Mode
    </div>
  );
};

export default Settings;
