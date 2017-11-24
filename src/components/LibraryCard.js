import React from 'react';
import PropTypes from 'prop-types';
import { fetchImdbId, fetchTrailer } from '../utils/Api';
import LibraryCardFront from './LibraryCardFront';
import LibraryCardBack from './LibraryCardBack';

export default class LibraryCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
      imdbLink: null,
      trailerLink: null
    };

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const { media } = this.props;

    fetchImdbId(media).then(result =>
      this.setState({
        imdbLink: result
      }));

    fetchTrailer(media).then(result =>
      this.setState({
        trailerLink: result
      }));
  }

  handleClick() {
    this.setState({
      clicked: !this.state.clicked
    });
  }

  render() {
    const { media, removeFromLibrary } = this.props;
    const { clicked, imdbLink, trailerLink } = this.state;

    return (
      <div className="library-card" onClick={this.handleClick}>
        {clicked
          ? <LibraryCardBack
              media={media}
              removeFromLibrary={removeFromLibrary}
              imdbLink={imdbLink}
              trailerLink={trailerLink}
            />
          : <LibraryCardFront media={media} />}
      </div>
    );
  }
}

LibraryCard.propTypes = {
  media: PropTypes.object.isRequired,
  removeFromLibrary: PropTypes.func.isRequired
};
