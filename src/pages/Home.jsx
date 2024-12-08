import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import Card from '../components/Card';

const Home = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState('');
  const [sortOption, setSortOption] = useState('name');
  const [regionFilter, setRegionFilter] = useState('');
  const { theme } = useTheme();

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then((res) => res.json())
      .then((data) => setCountries(data));
  }, []);

  const filteredCountries = countries
    .filter((country) =>
      country.name.common.toLowerCase().includes(search.toLowerCase())
    )
    .filter((country) => (regionFilter ? country.region === regionFilter : true))
    .sort((a, b) =>
      sortOption === 'population'
        ? a.population - b.population
        : a.name.common.localeCompare(b.name.common)
    );

  return (
    <div
      className={`p-6 transition-colors duration-300 ${
        theme === 'dark'
          ? 'bg-gray-900 text-gray-100'
          : 'bg-white text-gray-800'
      }`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Filters Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <input
            type="text"
            placeholder="Search country"
            className={`border p-2 rounded-lg shadow focus:outline-none focus:ring-2 ${
              theme === 'dark'
                ? 'bg-gray-800 text-gray-100 border-gray-700 focus:ring-blue-400'
                : 'bg-gray-100 text-gray-800 border-gray-300 focus:ring-blue-500'
            } w-full md:w-1/3`}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            onChange={(e) => setRegionFilter(e.target.value)}
            className={`border p-2 rounded-lg shadow focus:outline-none focus:ring-2 ${
              theme === 'dark'
                ? 'bg-gray-800 text-gray-100 border-gray-700 focus:ring-blue-400'
                : 'bg-gray-100 text-gray-800 border-gray-300 focus:ring-blue-500'
            } w-full md:w-1/4`}
          >
            <option value="">All Regions</option>
            <option value="Africa">Africa</option>
            <option value="Americas">Americas</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
          </select>
          <select
            onChange={(e) => setSortOption(e.target.value)}
            className={`border p-2 rounded-lg shadow focus:outline-none focus:ring-2 ${
              theme === 'dark'
                ? 'bg-gray-800 text-gray-100 border-gray-700 focus:ring-blue-400'
                : 'bg-gray-100 text-gray-800 border-gray-300 focus:ring-blue-500'
            } w-full md:w-1/4`}
          >
            <option value="name">Sort by Name</option>
            <option value="population">Sort by Population</option>
          </select>
        </div>

        {/* Countries Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredCountries.length > 0 ? (
            filteredCountries.map((country) => (
              <Card key={country.cca3} country={country} />
            ))
          ) : (
            <p className="text-center col-span-full text-lg">
              No countries match the selected filters.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;