import React from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import MediaQuery from 'react-responsive';
import LibraryCardFront from './LibraryCardFront';
import LibraryCardBack from './LibraryCardBack';
import TrailerModal from './TrailerModal';

export default class LibraryCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
      showModal: false,
      trailerKey: null
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleTrailerModal = this.handleTrailerModal.bind(this);
  }

  // (FIXED? test and refactor)
  // TODO: bug 'Party' movie, 'results' undefined? same as imdb etc.
  // discover cards without trailer breaks.
  componentDidMount() {
    // abstract this out to api component?
    const trailer = this.props.media.videos
      ? this.props.media.videos.results
      : null;

    this.setState({
      trailerKey: trailer !== null ? trailer[0].key : null
    });
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
    const { clicked, showModal, trailerKey } = this.state;

    return (
      <div className="library-card-container">
        {/* mobile -- view card back conditionally with click event */}
        <MediaQuery maxWidth={768}>
          <div className="library-card" onClick={this.handleClick}>
            {clicked ? (
              <LibraryCardBack
                media={media}
                removeFromLibrary={removeFromLibrary}
                trailerKey={trailerKey}
                handleTrailerModal={this.handleTrailerModal}
              />
            ) : (
              <LibraryCardFront media={media} />
            )}
          </div>
        </MediaQuery>

        {/* desktop - view card back with hover event using css. */}
        <MediaQuery minWidth={768}>
          <div className="library-card">
            <LibraryCardBack
              media={media}
              removeFromLibrary={removeFromLibrary}
              trailerKey={trailerKey}
              handleTrailerModal={this.handleTrailerModal}
            />
            <LibraryCardFront media={media} />
          </div>
        </MediaQuery>

        <ReactModal
          isOpen={showModal}
          onRequestClose={this.handleTrailerModal}
          className="trailer-modal"
          overlayClassName="trailer-modal-overlay"
        >
          <div className="video-wrapper">
            <TrailerModal trailerKey={trailerKey} />
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
