import React from 'react';
import { Navbar } from './components';
import Routes from './routes';
import store, { getProducts } from './store';

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
    </div>
  );
};

export default App;
