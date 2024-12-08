import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const CountryDetails = () => {
  const { name } = useParams();
  const [country, setCountry] = useState(null);
  const { theme } = useTheme();

  useEffect(() => {
    fetch(`https://restcountries.com/v3.1/name/${name}`)
      .then((res) => res.json())
      .then((data) => setCountry(data[0]));
  }, [name]);

  if (!country) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
        <div className="flex flex-col items-center space-y-4">
          <p className="text-lg text-gray-500 dark:text-gray-300">Loading...</p>
          <div className="w-12 h-12 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

return (
    <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className={`p-6 max-w-7xl mx-auto rounded-lg shadow-lg transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-900 text-gray-200' : 'bg-white text-gray-900'}`}
    >
        <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-6 lg:space-y-0 lg:space-x-8">
            <img
                src={country.flags.svg}
                alt={`${country.name.common} flag`}
                className="w-full lg:w-1/3 rounded-lg shadow-xl object-cover transition-transform duration-300 transform hover:scale-105"
            />
            <div className="flex-1 space-y-4">
                <h1 className={`text-4xl font-extrabold mb-4 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>
                    {country.name.common}
                </h1>
                <p className={`text-lg ${theme === 'dark' ? 'text-gray-400' : 'text-gray-800'}`}>
                    <span className={`font-semibold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>Region:</span> {country.region}
                </p>
                <p className={`text-lg ${theme === 'dark' ? 'text-gray-400' : 'text-gray-800'}`}>
                    <span className={`font-semibold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>Subregion:</span> {country.subregion}
                </p>
                <p className={`text-lg ${theme === 'dark' ? 'text-gray-400' : 'text-gray-800'}`}>
                    <span className={`font-semibold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>Languages:</span>{' '}
                    {Object.values(country.languages || {}).join(', ') || 'N/A'}
                </p>
                <p className={`text-lg ${theme === 'dark' ? 'text-gray-400' : 'text-gray-800'}`}>
                    <span className={`font-semibold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>Population:</span>{' '}
                    {country.population.toLocaleString()}
                </p>
            </div>
        </div>

        <div className="mt-8">
            <h2 className={`text-3xl font-bold mb-6 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>Additional Information</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                    { label: 'Capital:', value: country.capital ? country.capital.join(', ') : 'N/A' },
                    { 
                        label: 'Currencies:', 
                        value: country.currencies ? 
                            Object.values(country.currencies).map((currency) => `${currency.name} (${currency.symbol})`).join(', ') : 
                            'N/A' 
                    },
                    { label: 'Area:', value: `${country.area.toLocaleString()} km²` },
                    { label: 'Timezones:', value: country.timezones ? country.timezones.join(', ') : 'N/A' },
                ].map((item, index) => (
                    <li key={index} className={`bg-gray-100 dark:bg-slate-700 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow `}>
                        <span className={`font-semibold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>{item.label}</span> {item.value}
                    </li>
                ))}
            </ul>
        </div>
    </motion.div>
);
};

export default CountryDetails;