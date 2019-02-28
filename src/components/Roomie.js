import React from 'react';

const Roomie = ({ roomie }) => {
  return (
    <div>
      <img className="roomie_pic" src={roomie.profile_img} alt="roomie pic" />
      <h2>{roomie.username}</h2>
      <p>Budget: £{roomie.budgetMin} - £{roomie.budgetMax} pcm</p>
      <p>Drinks: {roomie.drink}</p>
      <p>Drugs: {roomie.drugs}</p>
      <p>Smoke: {roomie.smoke}</p>
    </div>
  );
};

export default Roomie;