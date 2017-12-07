import React from 'react';
import PropTypes from 'prop-types';
import truncate from 'lodash/truncate';
import Icon from '../utils/Icon';

export default function DiscoverCard({ media }) {
  return (
    <div className="discover-card">
      <div className="poster-info-container">
        <div className="discover-poster">
          <div className="img-container">
            <img
              src={`https://image.tmdb.org/t/p/w154${media.poster_path}`}
              alt={`${media.title ? media.title : media.name} poster`}
            />
            <span className="rating-tag">
              <h3>{media.vote_average.toFixed(1)}</h3>
            </span>
          </div>
        </div>
        <div className="discover-info">
          <h2>
            {truncate(media.title ? media.title : media.name, {
              length: 40,
              separator: ' '
            })}
          </h2>
          {/*<h3>Adventure, Drama, Family</h3>*/}
          <h3><span>Director:</span> Christopher Nolan</h3>
          <h3>
            {typeof media.release_date === 'string'
              ? media.release_date.substring(0, 4)
              : media.first_air_date.substring(0, 4)}
          </h3>
          <p>
            {truncate(media.overview, { length: 100, separator: ' ' })}
          </p>
        </div>
      </div>
      <div className="discover-footer">
        <h3><span>Lead:</span> Leonardo DiCaprio</h3>
        <div className="buttons">
          <a className="imdb" href="http://www.google.com" target="blank">
            <Icon icon="text" width="18" height="18" />
            <span className="imdb-tooltip">Imdb</span>
          </a>

          <div className="trailer">
            <Icon icon="preview" width="21" height="21" />
            <span className="trailer-tooltip">Trailer</span>
          </div>

          <div className="add">
            <Icon icon="archive" width="18" height="18" />
            <span className="add-tooltip">+Library</span>
          </div>
        </div>
      </div>
    </div>
  );
}

DiscoverCard.propTypes = {
  media: PropTypes.shape({
    title: PropTypes.string,
    release_date: PropTypes.string
  }).isRequired
};
