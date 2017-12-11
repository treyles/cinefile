import React from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import { fetchTrailer } from '../utils/Api';
import LibraryCardFront from './LibraryCardFront';
import LibraryCardBack from './LibraryCardBack';
import TrailerModal from './TrailerModal';

export default class LibraryCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
      showModal: false,
      trailerLink: ''
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleTrailerModal = this.handleTrailerModal.bind(this);
    this.handleTrailer = this.handleTrailer.bind(this);
  }

  handleClick() {
    this.setState({
      clicked: !this.state.clicked
    });
  }

  handleTrailer() {
    fetchTrailer(this.props.media).then(response => {
      this.setState({
        trailerLink: response
      });

      this.handleTrailerModal();
    });
  }

  handleTrailerModal() {
    this.setState({
      showModal: !this.state.showModal
    });
  }

  render() {
    const { media, removeFromLibrary } = this.props;
    const { clicked, trailerLink, showModal } = this.state;

    return (
      <div>
        <div className="library-card" onClick={this.handleClick}>
          {clicked
            ? <LibraryCardBack
                media={media}
                removeFromLibrary={removeFromLibrary}
                handleTrailer={this.handleTrailer}
                trailerLink={trailerLink}
              />
            : <LibraryCardFront media={media} />}
        </div>
        <ReactModal
          isOpen={showModal}
          onRequestClose={this.handleTrailerModal}
          className="trailer-modal"
          overlayClassName="trailer-modal-overlay"
        >
          <div className="video-wrapper">
            <TrailerModal trailerLink={trailerLink} />
          </div>
        </ReactModal>
      </div>
    );
  }
}

LibraryCard.propTypes = {
  media: PropTypes.object.isRequired,
  removeFromLibrary: PropTypes.func.isRequired
};
