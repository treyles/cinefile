import React from 'react';
import PropTypes from 'prop-types';

// change 'movies' to 'media' maps
class SearchResultList extends React.Component {
  isShowName(title) {
    return title.title ? title.title : title.name;
  }

  isShowDate(title) {
    return title.release_date || title.release_date === ''
      ? title.release_date.substring(0, 4)
      : title.first_air_date.substring(0, 4);
  }

  handleClick(data) {
    this.props.updateLibrary(data);
  }

  render() {
    const basePosterPath = 'https://image.tmdb.org/t/p/w500';
    return (
      <div className="search-results">
        <ul>
          {this.props.media
            .filter(title => title.poster_path !== null)
            .map(title => (
              <li key={title.id}>
                <img
                  className="search-poster"
                  src={`${basePosterPath}${title.poster_path}`}
                  alt={`poster for ${this.isShowName(title)}`}
                />
                <div className="search-info">
                  <h2>{this.isShowName(title)}</h2>
                  <h3>{this.isShowDate(title)}</h3>
                </div>
                <div className="search-add">
                  <button
                    className="search-add-btn"
                    onClick={() => {
                      this.handleClick(title);
                    }}
                  >
                    +
                  </button>
                  <h3>
                    Add to Library
                  </h3>
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
  media: PropTypes.arrayOf(PropTypes.object)
};

export default SearchResultList;
