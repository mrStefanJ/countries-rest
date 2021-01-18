import React, { useState, useEffect, useRef } from 'react';
import Fuse from 'fuse.js';
import './filter.scss';
import PropTypes from 'prop-types';

const Filter = ({ countries, setCountries }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectRegion, setSelectRegion] = useState('default');
  const [showOptions, setShowOptions] = useState(false);
  const ref = useRef(null);

  // Select region
  useEffect(() => {
    if (selectRegion === 'default') {
      setCountries(countries);
      return;
    }

    const option = {
      includeScore: 0,
      minMatchCharLength: selectRegion.length,
      // SearchTerm in `region`
      keys: ['region'],
    };

    const fuse = new Fuse(countries, option);
    setCountries(fuse.search(selectRegion));
  }, [selectRegion]);

  // SearchTerm country
  useEffect(() => {
    if (searchTerm === '' || (searchTerm && searchTerm.length < 2)) {
      setCountries(countries);
      return;
    }

    const option = {
      includeScore: 0,
      minMatchCharLength: searchTerm.length,
      threshold: 0.1,
      // SearchTerm in `region`, `name` and  `capital`
      keys: ['region', 'name', 'capital'],
    };

    const fuse = new Fuse(countries, option);
    setCountries(fuse.search(searchTerm));
  }, [searchTerm]);

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setShowOptions(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  const regions = [
    {
      value: 'default',
      name: 'Filter by region',
    },
    {
      value: 'Africa',
      name: 'Africa',
    },
    {
      value: 'Americas',
      name: 'America',
    },
    {
      value: 'Asia',
      name: 'Asia',
    },
    {
      value: 'Europe',
      name: 'Europe',
    },
    {
      value: 'Oceania',
      name: 'Oceania',
    },
    {
      value: 'Polar',
      name: 'Polar',
    },
  ];
  return (
    <div className="filter">
      <div className="filter__search-wrappper">
        <input
          className="filter__search"
          type="search"
          name="searchTerm"
          value={searchTerm}
          placeholder="Search for a country"
          onChange={(e) => setSearchTerm(e.currentTarget.value)}
        />
        <span className="filter__search-icon"><i className="fa fa-search" /></span>
      </div>
      <div className="filter__region-wrapper" ref={ref}>
        <div
          role="button"
          tabIndex={0}
          className="filter__region"
          data-value={selectRegion}
          onKeyDown={() => setShowOptions(true)}
          onClick={() => setShowOptions(true)}
        >
          <span className="filter__region--selected">
            {regions.map((region) => {
              if (region.value === selectRegion) {
                return region.name;
              }
              return '';
            })}
          </span>
          <span className="filter__region-icon"><i className="fas fa-chevron-down" /></span>
        </div>
        <div className={`filter__region-item-wrapper ${showOptions && 'filter__region-item-wrapper--shown'}`}>
          {regions.map((region) => (
            <React.Fragment key={region.value}>
              {region.value !== selectRegion && <span
                role="option"
                tabIndex={0}
                className="filter__region-item"
                data-value={region.value}
                aria-selected={region.value === selectRegion}
                onKeyDown={(event) => {
                  setSelectRegion(event.currentTarget.getAttribute('data-value'));
                  setShowOptions(false);
                }}
                onClick={(event) => {
                  setSelectRegion(event.currentTarget.getAttribute('data-value'));
                  setShowOptions(false);
                }}
              >{region.name}</span>
              }
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filter;

Filter.propTypes = {
  // eslint-disable-next-line
  countries: PropTypes.array.isRequired,
  setCountries: PropTypes.func.isRequired,
};
