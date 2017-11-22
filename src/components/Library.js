import React from 'react';
import PropTypes from 'prop-types';

function LibraryCardFront({ media }) {
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

LibraryCardFront.propTypes = {
  media: PropTypes.shape({
    title: PropTypes.string,
    name: PropTypes.string,
    release_date: PropTypes.string,
    first_air_date: PropTypes.string,
    vote_average: PropTypes.number
  }).isRequired
};

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

    return (
      <div className="library">
        {library.map(media => <LibraryCardFront media={media} />)}
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
