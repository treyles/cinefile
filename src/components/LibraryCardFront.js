import React from 'react';
import PropTypes from 'prop-types';

export default function LibraryCardFront({ media }) {
  return (
    <div className="card-front">
      <div className="img-container">
        <img
          src={`https://image.tmdb.org/t/p/w500${media.poster_path}`}
          alt={`${media.title ? media.title : media.name} poster`}
        />
        <span className="rating-tag">
          <h3>{media.vote_average.toFixed(1)}</h3>
        </span>
      </div>
      <div className="library-info">
        <h2>{media.title ? media.title : media.name}</h2>
        <h3>
          {typeof media.release_date === 'string'
            ? media.release_date.substring(0, 4)
            : media.first_air_date.substring(0, 4)}
        </h3>
      </div>
    </div>
  );
}

LibraryCardFront.propTypes = {
  media: PropTypes.shape({
    title: PropTypes.string,
    name: PropTypes.string,
    release_date: PropTypes.string,
    first_air_date: PropTypes.string,
    vote_average: PropTypes.number
  }).isRequired
};
