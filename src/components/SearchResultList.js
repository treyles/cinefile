import React from 'react';
import PropTypes from 'prop-types';

// change 'movies' to 'media' maps

class SearchResultList extends React.Component {
  isTelevisionName(movie) {
    return movie.title ? movie.title : movie.name;
  }

  render() {
    const basePosterPath = 'https://image.tmdb.org/t/p/w500';

    return (
      <div className="search-results">
        <ul>
          {this.props.movies.map(movie => (
            <li key={movie.id}>
              <img
                className="search-poster"
                src={`${basePosterPath}${movie.poster_path}`}
                alt={`poster for ${this.isTelevisionName(movie)}`}
              />
              <div className="search-info">
                <span>
                  <p>{this.isTelevisionName(movie)}</p>
                  <p>{movie.first_air_date}</p>
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

SearchResultList.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object)
};

export default SearchResultList;
