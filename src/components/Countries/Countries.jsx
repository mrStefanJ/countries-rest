import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Filter from '../Filter/Filter';
import './countries.scss';

export default function Countries() {
  const [countries, setCountries] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchData = async () => {
    try {
      const result = await axios(`https://restcountries.com/v3.1/all`);
      console.log(result.data);
      if (!result.statusText && !result.status) throw new Error("Something is wrong");
      setIsLoading(false);
      setCountries(result.data);
      setFilteredData(result.data);
    }
    catch (error) {
      setIsLoading(false);
      setError(error.message)
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Filter countries={countries} filteredData={filteredData} setCountries={setFilteredData} />
      <div className="countries-list">
        {isLoading && !error && <h4>Loading......</h4>}
        {error && !isLoading && <h4>{error}</h4>}
        
        {filteredData.map((country) => {
          const result = 'item' in country ? country.item : country;
          return (
            <Link to={`/countries/${result.name.common}`} className="countries-list__card" key={result.name.common}>
              <div className="countries-list__card-flag">
                <img src={result.flags.png} className="countries-list__card-flag-size" alt={result.name.common} />
              </div>
              <div className="countries-list__card-details">
                <h3 className="countries-list__card-name">{result.name.common}</h3>
                <p className="countries-list__card-text">
                  Population: <span className="countries-list__cart-text-value">{result.population}</span>
                </p>
                <p className="countries-list__card-text">
                  Region: <span className="countries-list__cart-text-value">{result.region}</span>
                </p>
                <p className="countries-list__card-text">
                  Capital: <span className="countries-list__cart-text-value">{result.capital}</span>
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}
