import React from 'react';
import PropTypes from 'prop-types';
import truncate from 'lodash/truncate';
import Icon from '../utils/Icon';

export default function LibraryCardBack(props) {
  const {
    media,
    trailerKey,
    removeFromLibrary,
    handleTrailerModal
  } = props;

  const imdbId = media.imdb_id
    ? media.imdb_id
    : media.external_ids.imdb_id;

  return (
    <div className="card-back">
      <div className="title">
        <h2>
          {truncate(media.title ? media.title : media.name, {
            length: 40,
            separator: ' '
          })}
        </h2>
        <h3>
          {typeof media.release_date === 'string'
            ? media.release_date.substring(0, 4)
            : media.first_air_date.substring(0, 4)}
        </h3>
      </div>
      <div className="synopsis">
        <p>{truncate(media.overview, { length: 240, separator: ' ' })}</p>
      </div>
      <div className="buttons">
        <a
          className="imdb"
          href={`http://www.imdb.com/title/${imdbId}`}
          target="blank"
          onClick={e => e.stopPropagation()}
        >
          <Icon icon="text" width="18" height="18" />
          <span className="imdb-tooltip">Imdb</span>
        </a>
        {trailerKey !== null ? (
          <button className="trailer" onClick={() => handleTrailerModal()}>
            <Icon icon="preview" width="21" height="21" />
            <span className="trailer-tooltip">Trailer</span>
          </button>
        ) : null}
        <button
          className="delete"
          onClick={() => removeFromLibrary(media)}
        >
          <Icon icon="trash" width="18" height="18" />
          <span className="delete-tooltip">Delete</span>
        </button>
      </div>
    </div>
  );
}

LibraryCardBack.propTypes = {
  media: PropTypes.shape({
    title: PropTypes.string,
    name: PropTypes.string,
    release_date: PropTypes.string,
    first_air_date: PropTypes.string,
    overview: PropTypes.string.isRequired
  }).isRequired,
  removeFromLibrary: PropTypes.func.isRequired,
  handleTrailerModal: PropTypes.func.isRequired,
  trailerKey: PropTypes.string
};

LibraryCardBack.defaultProps = {
  trailerKey: null
};
