import React from 'react';
import '../css/Landing.css'

const Landing = () => {
  return (
    <main className="landing_page">
      <img src={require("../images/landing_logo.svg")} alt="roomie logo" />
    </main>
  );
};

export default Landing;