import React from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import { fetchImdbLink, fetchTrailer } from '../utils/Api';
import LibraryCardFront from './LibraryCardFront';
import LibraryCardBack from './LibraryCardBack';
import TrailerModal from './TrailerModal';

export default class LibraryCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
      showModal: false,
      imdbLink: null,
      trailerLink: null
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleTrailerModal = this.handleTrailerModal.bind(this);
  }

  componentDidMount() {
    const { media } = this.props;

    fetchImdbLink(media).then(result =>
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

  handleTrailerModal() {
    this.setState({
      showModal: !this.state.showModal
    });
  }

  render() {
    const { media, removeFromLibrary } = this.props;
    const { clicked, imdbLink, trailerLink, showModal } = this.state;

    return (
      <div className="library-card" onClick={this.handleClick}>
        {clicked
          ? <LibraryCardBack
              media={media}
              removeFromLibrary={removeFromLibrary}
              imdbLink={imdbLink}
              handleTrailerModal={this.handleTrailerModal}
            />
          : <LibraryCardFront media={media} />}
        <ReactModal
          isOpen={showModal}
          className="test-modal"
          overlayClassName="test-modal-overlay"
        >
          <button onClick={this.handleTrailerModal}>close modal</button>
          <TrailerModal trailerLink={trailerLink} />
        </ReactModal>
      </div>
    );
  }
}

LibraryCard.propTypes = {
  media: PropTypes.object.isRequired,
  removeFromLibrary: PropTypes.func.isRequired
};
