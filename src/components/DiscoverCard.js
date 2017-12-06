import React from 'react';

const DiscoverCard = ({ media }) => (
  <div className="discover-card">
    <h2>{media.title}</h2>
    <h2>{media.release_date}</h2>
  </div>
);

export default DiscoverCard;
