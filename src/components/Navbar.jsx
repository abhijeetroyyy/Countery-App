import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const { theme } = useTheme();

  return (
    <nav
      className={`p-4 flex justify-between items-center transition-all duration-300 ${
        theme === 'dark' ? 'bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900' : 'bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100'
      } shadow-lg`}
    >
      <Link
        to="/"
        className={`text-xl font-bold transition-colors duration-300 hover:text-blue-500 dark:hover:text-blue-300 ${
          theme === 'light' ? 'text-gray-800' : 'text-gray-100'
        }`}
      >
        Country Finder
      </Link>
      <div className="flex items-center space-x-6">
        <ThemeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
