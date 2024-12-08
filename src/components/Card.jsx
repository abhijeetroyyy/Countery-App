import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion'; // Optional: for smoother animations

const Card = ({ country }) => {
  const { theme } = useTheme();

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      whileHover={{ 
        scale: 1.05,
        boxShadow: theme === 'dark' 
          ? '0 20px 25px -5px rgba(255, 255, 255, 0.1), 0 10px 10px -5px rgba(255, 255, 255, 0.04)' 
          : '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
      }}
      className={`
        relative 
        overflow-hidden 
        rounded-2xl 
        border 
        transition-all 
        duration-300 
        ${theme === 'dark' 
          ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700' 
          : 'bg-gradient-to-br from-gray-100 to-gray-200 border-gray-300'}
        shadow-lg
        group
      `}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-300 
        bg-gradient-to-br from-blue-400 to-purple-500"></div>

      {/* Flag Image with Zoom Effect */}
      <div className="relative overflow-hidden">
        <img
          src={country.flags.svg}
          alt={`${country.name.common} flag`}
          className="w-full h-48 object-cover transition-transform duration-500 
            group-hover:scale-110 group-hover:brightness-75"
        />
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
      </div>

      {/* Country Details */}
      <div className="p-5 relative z-10">
        <h2 className={`
          text-2xl font-bold mb-3 truncate 
          ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}
        `}>
          {country.name.common}
        </h2>

        {/* Details with Elegant Typography */}
        <div className="space-y-2">
          {[
            { label: 'Population', value: country.population.toLocaleString() },
            { label: 'Region', value: country.region },
            { label: 'Capital', value: country.capital || 'N/A' }
          ].map(({ label, value }) => (
            <div 
              key={label}
              className={`
                flex items-center 
                ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}
              `}
            >
              <span className="font-semibold mr-2 w-24">{label}:</span>
              <span className="font-light">{value}</span>
            </div>
          ))}
        </div>

        {/* Details Button with Hover Effect */}
        <Link
          to={`/country/${country.name.common}`}
          className={`
            mt-4 
            block 
            text-center 
            py-3 
            rounded-lg 
            transition-all 
            duration-300 
            transform 
            hover:scale-105 
            focus:outline-none 
            focus:ring-2 
            ${theme === 'dark' 
              ? 'bg-blue-700 text-white hover:bg-blue-600 focus:ring-blue-500' 
              : 'bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-400'}
          `}
        >
          Explore Details
        </Link>
      </div>
    </motion.div>
  );
};

export default Card;