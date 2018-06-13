import React from 'react';
import '../styles/landingpage.css';
import { Link } from 'react-router-dom';
const LandingPage = () => {
  return (
    <div className="landingpage-main">
      <div className="landingpage-description">
        <div className="landingpage-text">
          <p className="landingpage-ft">FEATURED </p>
          <strong>
            <h1>Wood Chair Cloth </h1>
          </strong>
          <p>
            Praesent sapien massa, convallis a pellentesque nec, egestas non
            nisi. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.
          </p>
          <Link to="/products">
            <p className="explore">
              Explore Now{' '}
              <span>
                {' '}
                <i className="fas fa-caret-right caret" />
              </span>
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
