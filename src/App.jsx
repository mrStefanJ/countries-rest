import React, { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import './App.scss';
import Countries from './components/Countries/Countries';
import Country from './components/Country/Country';
import Header from './components/Header/Header';
import { ThemeContext, ThemeProvider } from './components/ThemeContext/ThemeContext';

const App = () => (
  <ThemeProvider>
    <PageContent />
  </ThemeProvider>
);

const PageContent = () => {
  const { themeName } = useContext(ThemeContext);
  return (
    <div className={`app ${themeName}`}>
      <Router>
        <Header />
        <Container>
          <Route exact path="/">
            <Countries />
          </Route>
          <Route path="/countries/:name">
            <Country />
          </Route>
        </Container>
      </Router>
    </div>

  );
};

export default App;
