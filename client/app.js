import React from 'react';
import { Navbar, Sidebar } from './components';
import Routes from './routes';
import 'bootstrap/dist/css/bootstrap.css';

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
    </div>
  );
};

export default App;
