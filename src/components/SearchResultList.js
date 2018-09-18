import React from 'react';
import PropTypes from 'prop-types';

export default class SearchResultList extends React.Component {
  renderMatchLi(media) {
    const { handleSelect } = this.props;

    const inLibraryColor = media.inLibrary ? 'inLibraryColor' : '';

    const inLibraryTag = (
      <div className="inlibrary-tag">
        <h2>{media.inLibrary && 'Delete from library'}</h2>
      </div>
    );

    const mediatypeTag = (
      <div className="mediatype-tag">
        <h2>{media.media_type === 'tv' ? 'Television' : 'Movie'}</h2>
      </div>
    );

    return (
      <li
        key={media.id}
        className={media.selected ? 'active' : ''}
        onClick={() => handleSelect(media, media.inLibrary)}
      >
        <img
          className="search-poster"
          src={`https://image.tmdb.org/t/p/w92${media.poster_path}`}
          alt={`${media.title ? media.title : media.name} poster`}
        />
        <div className="search-info">
          <h2 className={inLibraryColor}>
            {media.title ? media.title : media.name}
          </h2>
          <h3 className={inLibraryColor}>
            {typeof media.release_date === 'string'
              ? media.release_date.substring(0, 4)
              : media.first_air_date.substring(0, 4)}
          </h3>
        </div>
        {media.inLibrary ? inLibraryTag : mediatypeTag}
      </li>
    );
  }

  render() {
    const { matches } = this.props;

    return (
      <div className="search-results">
        <ul>
          {matches.length ? (
            matches.map(media => this.renderMatchLi(media))
          ) : (
            <li className="zero-results">
              <h2>Your search returned zero results</h2>
            </li>
          )}
        </ul>
      </div>
    );
  }
}

SearchResultList.propTypes = {
  matches: PropTypes.arrayOf(PropTypes.object).isRequired
};
