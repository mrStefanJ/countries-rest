import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Filter from '../Filter/Filter';
import './countries.scss';

export default function Countries() {
  const [countries, setCountries] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const fetchData = async () => {
    const result = await axios('https://restcountries.eu/rest/v2/all');
    setCountries(result.data);
    setFilteredData(result.data);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <Filter countries={countries} filteredData={filteredData} setCountries={setFilteredData} />
      <div className="countries-list">
        {filteredData.map((country) => {
          const result = 'item' in country ? country.item : country;
          return (
            <Link to={`/countries/${result.name}`} className="countries-list__card" key={result.name}>
              <div className="countries-list__card-flag">
                <img src={result.flag} className="countries-list__card-flag-size" alt={country.name} />
              </div>
              <div className="countries-list__card-details">
                <h3 className="countries-list__card-name">{result.name}</h3>
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
