import React from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import truncate from 'lodash/truncate';
import {
  fetchMediaDetails,
  fetchImdbLink,
  fetchMediaCredits,
  fetchTrailer
} from '../utils/Api';
import Icon from '../utils/Icon';
import TrailerModal from './TrailerModal';

export default class DiscoverCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imdbId: '',
      trailerLink: '',
      showModal: false,
      credits: {}
    };

    this.handleTrailerModal = this.handleTrailerModal.bind(this);
    this.handleAddToLibrary = this.handleAddToLibrary.bind(this);
    this.handleTrailer = this.handleTrailer.bind(this);
    this.handleImdbLink = this.handleImdbLink.bind(this);
  }

  componentDidMount() {
    // scroll to top if new query (or if on first page)
    if (this.props.currentPage === 1) {
      window.scrollTo(0, 0);
    }

    fetchMediaCredits(this.props.media).then(response => {
      this.setState({
        credits: response
      });
    });
  }

  handleAddToLibrary() {
    const { media, addToLibrary } = this.props;
    fetchMediaDetails(media).then(response => addToLibrary(response.data));
  }

  handleImdbLink(e) {
    e.preventDefault();

    // hack to avoid pop-up blockers when using window.onload.
    // due to api limitations we need to generate link on click/ajax request.
    // credit to pstenstrm: https://stackoverflow.com/questions/2587677/avoid-browser-popup-blockers
    const win = window.open('about:blank', '_blank');
    fetchImdbLink(this.props.media).then(response => {
      setTimeout(() => win.location.href = response, 10);
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
    const { showModal, trailerLink, credits } = this.state;
    const { media } = this.props;

    return (
      <div className="discover-card">
        <div className="poster-info-container">
          <div className="discover-poster">
            <div className="img-container">
              <img
                src={`https://image.tmdb.org/t/p/w154${media.poster_path}`}
                alt={`${media.title ? media.title : media.name} poster`}
              />
              <span className="rating-tag">
                <h3>{media.vote_average.toFixed(1)}</h3>
              </span>
            </div>
          </div>
          <div className="discover-info">
            <h2>
              {truncate(media.title ? media.title : media.name, {
                length: 40,
                separator: ' '
              })}
            </h2>
            <h3>
              <span>{media.title ? 'Director:' : 'Creator:'}</span>
              {' '}
              {credits.header}
            </h3>
            <h3>
              {typeof media.release_date === 'string'
                ? media.release_date.substring(0, 4)
                : media.first_air_date.substring(0, 4)}
            </h3>
            <p>
              {truncate(media.overview, { length: 100, separator: ' ' })}
              {media.id}
            </p>
          </div>
        </div>
        {/* TODO: make these divs buttons? */}
        <div className="discover-footer">
          <h3>
            <span>{media.title ? 'Lead:' : 'Seasons:'}</span>
            {' '}
            {credits.footer}
          </h3>
          <div className="buttons">
            <div className="imdb" onClick={this.handleImdbLink}>
              <Icon icon="text" width="18" height="18" />
              <span className="imdb-tooltip">Imdb</span>
            </div>
            {trailerLink !== 'no trailer'
              ? <div className="trailer" onClick={this.handleTrailer}>
                  <Icon icon="preview" width="21" height="21" />
                  <span className="trailer-tooltip">Trailer</span>
                </div>
              : null}
            <div className="add" onClick={this.handleAddToLibrary}>
              <Icon icon="archive" width="18" height="18" />
              <span className="add-tooltip">Add to library</span>
            </div>
          </div>
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

DiscoverCard.propTypes = {
  media: PropTypes.shape({
    title: PropTypes.string,
    release_date: PropTypes.string
  }).isRequired,
  addToLibrary: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired
};
