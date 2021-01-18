import React, { useState } from 'react';
import PropTypes from 'prop-types';

export const ThemeContext = React.createContext({
  themeName: 'light',
  // eslint-disable-next-line
  toggleTheme: (name) => {},
});

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = (name) => {
    setTheme(name);
  };
  return (
    <ThemeContext.Provider value={{ themeName: theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
