import React from 'react';
import { Navbar, Sidebar } from './components';
import Routes from './routes';
import store, { getProducts } from './store';

const App = () => {
  return (
    <div>
      <Navbar />
      <div className="flexWrap">
        <Sidebar />
        <Routes />
      </div>
    </div>
  );
};

export default App;
