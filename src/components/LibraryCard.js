import React from 'react';
import PropTypes from 'prop-types';
import { fetchImdbId } from '../utils/Api';
import LibraryCardFront from './LibraryCardFront';
import LibraryCardBack from './LibraryCardBack';

export default class LibraryCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
      imdbLink: ''
    };

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    fetchImdbId(this.props.media).then(result =>
      this.setState({
        imdbLink: `http://www.imdb.com/title/${result}`
      }));
  }

  handleClick() {
    this.setState({
      clicked: !this.state.clicked
    });
  }

  render() {
    const { media, updateLibrary } = this.props;
    const { clicked, imdbLink } = this.state;

    return (
      <div className="library-card" onClick={this.handleClick}>
        {clicked
          ? <LibraryCardBack
              media={media}
              updateLibrary={updateLibrary}
              imdbLink={imdbLink}
            />
          : <LibraryCardFront media={media} />}
      </div>
    );
  }
}

LibraryCard.propTypes = {
  media: PropTypes.object.isRequired,
  updateLibrary: PropTypes.func.isRequired
};
