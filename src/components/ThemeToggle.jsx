import { useTheme } from '../context/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-3 text-sm font-medium rounded-full transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-400 dark:bg-gray-800 dark:hover:bg-gray-700 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-100 hover:from-gray-400 hover:to-gray-300 shadow-lg hover:scale-105"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? 'Switch to Dark' : 'Switch to Light'}
    </button>
  );
};

export default ThemeToggle;
