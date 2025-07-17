import { motion } from 'framer-motion';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { useDarkMode } from '../hooks/useDarkMode';

const DarkModeToggle = () => {
  const { isDarkMode, toggleTheme } = useDarkMode();

  return (
    <motion.button
      onClick={toggleTheme}
      className="fixed top-20 right-4 z-50 p-2 rounded-full bg-white dark:bg-gray-800 shadow-lg"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label="Toggle dark mode"
    >
      {isDarkMode ? (
        <SunIcon className="h-6 w-6 text-yellow-500" />
      ) : (
        <MoonIcon className="h-6 w-6 text-gray-700" />
      )}
    </motion.button>
  );
};

export default DarkModeToggle;
