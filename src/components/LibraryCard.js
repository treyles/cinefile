import React from 'react';
import PropTypes from 'prop-types';
import truncate from 'lodash/truncate';

function CardFront({ media }) {
  return (
    <div>
      <div className="img-container">
        <img
          src={`https://image.tmdb.org/t/p/w154${media.poster_path}`}
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

CardFront.propTypes = {
  media: PropTypes.shape({
    title: PropTypes.string,
    name: PropTypes.string,
    release_date: PropTypes.string,
    first_air_date: PropTypes.string,
    vote_average: PropTypes.number
  }).isRequired
};

function CardBack({ media, updateLibrary }) {
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
        <p>{truncate(media.overview, { length: 200, separator: ' ' })}</p>
      </div>
      <div className="buttons">
        buttons go here.
      </div>
    </div>
  );
}

export default class LibraryCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({
      clicked: !this.state.clicked
    });
  }

  render() {
    const { media, updateLibrary } = this.props;
    const { clicked } = this.state;

    return (
      <div className="library-card" onClick={this.handleClick}>
        {clicked
          ? <CardBack media={media} updateLibrary={updateLibrary} />
          : <CardFront media={media} />}
      </div>
    );
  }
}

LibraryCard.propTypes = {
  media: PropTypes.object.isRequired,
  updateLibrary: PropTypes.func.isRequired
};
