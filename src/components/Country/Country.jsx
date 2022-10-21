import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import './country.scss';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const Country = () => {
  const [country, setCountry] = useState([]);
  const [borderCountries, setBorderCountries] = useState([]);
  const { name } = useParams();

  const fetchCountryData = async () => {
    const result = await axios(`https://restcountries.com/v3.1/name/${name}`);
    console.log(result.data);
    if (result.data[0].borders.length > 0) {
      let countriesName = '';
      result.data[0].borders.forEach((border, index) => {
        if (index === result.data[0].borders - 1) {
          countriesName += `${border}`;
        } else {
          countriesName += `${border};`;
        }
      });
      // const borders = await axios(`https://restcountries.com/v3.1/alpha?codes=${countriesName}`);
      // setBorderCountries(borders);
    }

    setCountry(result.data);
  };

  useEffect(() => {
    fetchCountryData();
    // eslint-disable-next-line
  }, [name]);

  return (
    <Row>
      <Col xs={12}>
        <section className="country">
          <Link to="/" className="country__back-btn">
            <i className="fas fa-arrow-left" />
            <span className="country__back-btn-text">Back</span>
          </Link>
          {country.map((item) => {
            const currencyKey = Object.keys(item.currencies);
            const nativeNameKey = Object.keys(item.name.nativeName);
            const languageKey = Object.keys(item.languages);

            console.log(currencyKey, item.currencies[currencyKey[0]])
            return (
              <Row key={item.ccn3}>
                <Col xs={12} xl={6}>
                  <div className="country__flag-wrapper">
                    <img src={item.flags.png} className="country__flag" alt={item.name.common} />
                  </div>
                </Col>
                <Col xs={12} xl={6}>
                  <div className="country__details-wrapper">
                    <h1 className="country__name">{item.name.common}</h1>
                    <div className="country__details">
                      <div className="country__col">
                        <p className="country__info">
                          Native Name:
                          {nativeNameKey.map((name) => (
                            <span key={name} className="country__info-value">{item.name.nativeName[name].official}</span>
                          ))}
                        </p>
                        <p className="country__info">
                          Population: <span className="country__info-value">{item.population}</span>
                        </p>
                        <p className="country__info">
                          Region: <span className="country__info-value">{item.region}</span>
                        </p>
                        <p className="country__info">
                          Sub Region: <span className="country__info-value">{item.subregion}</span>
                        </p>
                        <p className="country__info">
                          Capital: <span className="country__info-value">{item.capital}</span>
                        </p>
                      </div>
                      <div className="country__col">
                        <p className="country__info">
                          Top Level Domain: <span className="country__info-value">{item.tld}</span>
                        </p>
                        <p className="country__info">
                          Currencies:
                          {currencyKey.map((currency) => (
                            <span key={currency} className="country__info-value">{item.currencies[currency].symbol}</span>
                          ))}
                        </p>
                        <p className="country__info">
                          Languages:
                          {languageKey.map((lang) => (
                            <span key={lang} className="country__info-value">{item.languages[lang]}</span>
                          ))}
                        </p>
                      </div>
                    </div>
                    {/* {borderCountries.length > 0
                    && <div className="country__borders-wrapper">
                      <h3 className="country__borders-title country__borders-title--md-hide">Border Countries:</h3>
                      <div className="country__borders-list">
                        <h3 className="country__borders-title country__borders-title--md-show">Border Countries:</h3>
                        {borderCountries.map((border) => (
                          <Link to={`/countries/${border.name}`} key={border.alpha2Code} className="country__borders-item">{border.name}</Link>
                        ))}
                      </div>
                    </div>
                  } */}
                  </div>
                </Col>
              </Row>
            )
          })}
        </section>
      </Col>
    </Row>
  );
};

export default Country;
