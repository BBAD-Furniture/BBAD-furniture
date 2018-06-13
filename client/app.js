import React from 'react';
import { Navbar, Sidebar } from './components';
import Routes from './routes';
import 'bootstrap/dist/css/bootstrap.css';
import { ToastContainer, Slide } from 'react-toastify';

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={true}
        transition={Slide}
      />
    </div>
  );
};

export default App;
