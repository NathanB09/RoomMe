import React from 'react';

const Property = ({ listing }) => {
  return (
    <div>
      <img src={listing.img_url} alt="property" />
      <p>£{listing.price * 4} pcm</p>
      <p>Bedrooms {listing.bedroom_number}</p>
      <p>Bathrooms {listing.bathroom_number}</p>
      <p>{listing.title}</p>
      <a href={listing.lister_url} target='blank'>more info</a>
    </div>
  );
};

export default Property;