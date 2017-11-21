import React from 'react';
import PropTypes from 'prop-types';

function LibraryCard({ media }) {
  return (
    <div className="library-card">
      <span>
        <div className="img-container">
          <img
            src={`https://image.tmdb.org/t/p/w154${media.poster_path}`}
            alt={`${media.title ? media.title : media.name} poster`}
          />
          <span className="rating-tag">
            {media.vote_average.toFixed(1)}
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
      </span>
    </div>
  );
}

LibraryCard.propTypes = {
  media: PropTypes.shape({
    title: PropTypes.string,
    name: PropTypes.string,
    release_date: PropTypes.string,
    first_air_date: PropTypes.string,
    vote_average: PropTypes.number
  }).isRequired
};

function LibraryCardFlip({ media }) {
  return (
    <div className="library-card">
      <span>
        <div className="img-container">
          <img
            src={`https://image.tmdb.org/t/p/w154${media.poster_path}`}
            alt={`${media.title ? media.title : media.name} poster`}
          />
          <span className="rating-tag">
            69
          </span>
        </div>
        <div className="library-info">
          <h2>Flipped</h2>
          <h3>
            1999
          </h3>
        </div>
      </span>
    </div>
  );
}

export default class Library extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false
    };

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  handleClick() {
    this.setState({
      clicked: !this.state.clicked
    });
  }

  render() {
    const { library, updateLibrary } = this.props;
    const { clicked } = this.state;

    return (
      <div className="library">
        {library.map(media => (
          <div
            className="media-wrapper"
            key={media.id}
            onClick={this.handleClick}
          >
            {clicked
              ? <LibraryCardFlip media={media} />
              : <LibraryCard media={media} />}
          </div>
        ))}
      </div>
    );
  }
}

Library.propTypes = {
  library: PropTypes.arrayOf(PropTypes.object),
  updateLibrary: PropTypes.func.isRequired
};

Library.defaultProps = {
  library: []
};
