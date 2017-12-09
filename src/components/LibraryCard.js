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
      trailerLink: null
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleTrailerModal = this.handleTrailerModal.bind(this);
  }

  componentDidMount() {
    fetchTrailer(this.props.media).then(result =>
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
    const { clicked, trailerLink, showModal } = this.state;

    return (
      <div>
        <div className="library-card" onClick={this.handleClick}>
          {clicked
            ? <LibraryCardBack
                media={media}
                removeFromLibrary={removeFromLibrary}
                handleTrailerModal={this.handleTrailerModal}
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
