import React, { useEffect, useState } from "react";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <input
      type="checkbox"
      className="toggle toggle-sm"
      checked={theme === "dark"}
      onChange={toggleTheme}
      title="Toggle Light/Dark Mode"
    />
  );
};

export default ThemeToggle;
