import React from 'react';
import { Link } from 'react-router-dom'

const Roomie = ({ roomie }) => {
  return (
    <div className={"roomie_card_wrapper"}>
      <Link to={`/roomies/${roomie.username}`} className="roomie_card">
        <div className="roomie_pic_wrapper">
          <img src={roomie.profile_img} alt="roomie pic" />
          <h2>{roomie.username}</h2>
        </div>
        <div className="roomie_details_wrapper">
          <p>
            <i className="fas fa-coins"></i>
            £{roomie.budgetMin} - £{roomie.budgetMax} pcm
        </p>
          <p>
            <i className="fas fa-cocktail"></i>
            Drinks: {roomie.drink}
          </p>
          <p>
            <i className="fas fa-smoking"></i>
            Smoke: {roomie.smoke}
          </p>
          <p>
            <i className="fas fa-users"></i>
            {roomie.profession}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default Roomie;