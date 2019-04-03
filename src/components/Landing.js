import React from 'react';
import '../css/Landing.css'

const Landing = () => {
  return (
    <main className="landing_page">
      <img src={require("../images/landing_logo.svg")} alt="roomie logo" />
      <div>
        <p>Find roommates looking to rent within your price range</p>
        <p>Roommate matches based on your preferences</p>
      </div>
    </main>
  );
};

export default Landing;
