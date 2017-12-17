import React from 'react';
import PropTypes from 'prop-types';
import { fetchMediaDetails } from '../utils/Api';

export default class SearchResultList extends React.Component {
  constructor(props) {
    super(props);

    this.handleAddToLibrary = this.handleAddToLibrary.bind(this);
  }

  handleAddToLibrary(media) {
    fetchMediaDetails(media).then(response =>
      this.props.addToLibrary(response));
  }

  render() {
    const { matches } = this.props;

    return (
      <div className="search-results">
        <ul>
          {matches.map(media => (
            <li
              key={media.id}
              onClick={() => this.handleAddToLibrary(media)}
            >
              <img
                className="search-poster"
                src={`https://image.tmdb.org/t/p/w92${media.poster_path}`}
                alt={`${media.title ? media.title : media.name} poster`}
              />
              <div className="search-info">
                <h2>{media.title ? media.title : media.name}</h2>
                <h3>
                  {typeof media.release_date === 'string'
                    ? media.release_date.substring(0, 4)
                    : media.first_air_date.substring(0, 4)}
                </h3>
              </div>
              <div className="mediatype-tag">
                <h2>
                  {media.media_type === 'tv' ? 'Television' : 'Movie'}
                </h2>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

// use shape?
SearchResultList.propTypes = {
  matches: PropTypes.arrayOf(PropTypes.object).isRequired,
  addToLibrary: PropTypes.func.isRequired
};

// const mediaDate = media => {
//   if (media.release_date || media.release_date === '') {
//     return media.release_date.substring(0, 4);
//   }
//   return media.first_air_date.substring(0, 4);
// };

/*   <div className="search-add">
                <button
                  className="search-add-btn"
                  onClick={() => this.handleAddToLibrary(media)}
                >
                  +
                </button>
                <h3>
                  Add to Library
                </h3>
              </div>*/
