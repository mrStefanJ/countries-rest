import React, { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import { ThemeContext } from '../ThemeContext/ThemeContext';
import './header.scss';

const Header = () => {
  const { toggleTheme, themeName } = useContext(ThemeContext);
  return (
    <header className="header">
      <Container>
        <div className="header__content">
          <p className="header__text">
            Where in the world?
          </p>
          <button type="button" className="header__theme-switch" onClick={() => toggleTheme(themeName === 'light' ? 'dark' : 'light')}>
            <i className={`${themeName === 'light' ? 'far' : 'fas'} fa-moon`} />
            <span className="header__theme-switch-text">Dark Mode</span>
          </button>
        </div>
      </Container>
    </header>
  );
};

export default Header;
