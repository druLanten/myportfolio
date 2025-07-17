import { useEffect } from 'react';
import useThemeStore from '../store/themeStore';

// Add dark mode class to HTML element on initial load
if (typeof window !== 'undefined') {
  document.documentElement.classList.add('dark');
}

export const useDarkMode = () => {
  const { isDarkMode, toggleTheme } = useThemeStore();

  useEffect(() => {
    // Update the class on the html element when dark mode changes
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return { isDarkMode, toggleTheme };
};
