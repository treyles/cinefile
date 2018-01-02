import React from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import truncate from 'lodash/truncate';
import { fetchMediaDetails } from '../utils/Api';
import Icon from '../utils/Icon';
import TrailerModal from './TrailerModal';

export default class DiscoverCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      imdbId: '#',
      trailerKey: null,
      showModal: false,
      credits: {
        header: '',
        footer: ''
      }
    };

    this.handleTrailerModal = this.handleTrailerModal.bind(this);
    this.handleAddToLibrary = this.handleAddToLibrary.bind(this);
  }

  componentDidMount() {
    // scroll to top if new query (or if on first page)
    if (this.props.currentPage === 1) {
      window.scrollTo(0, 0);
    }

    fetchMediaDetails(this.props.media).then(response => {
      // TODO: REFACTOR THIS MESS
      // abstract out to new component above? (return obj)
      let mediaCredits;
      const credit = response.credits;
      const trailer = response.videos.results;

      const imdb = response.imdb_id
        ? response.imdb_id
        : response.external_ids.imdb_id;

      const getDirector = credit.crew.filter(el => el.job === 'Director');
      const getLead = credit.cast.filter(el => el.order < 3);
      // response.title is unique to movies
      if (response.title) {
        mediaCredits = {
          header: credit.crew.length ? getDirector[0].name : 'n/a',
          // TODO: get smallest order #, cant rely on < 3
          footer: credit.cast.length ? getLead[0].name : 'n/a'
        };
      } else {
        mediaCredits = {
          header: response.created_by.length
            ? response.created_by[0].name
            : 'n/a',
          footer: response.number_of_seasons
        };
      }

      this.setState({
        data: response,
        imdbId: imdb,
        credits: mediaCredits,
        trailerKey: trailer.length ? trailer[0].key : null
      });
    });
  }

  handleTrailerModal() {
    this.setState({
      showModal: !this.state.showModal
    });
  }

  handleAddToLibrary() {
    const { media, addToLibrary, handleRemoveMatch } = this.props;

    addToLibrary(this.state.data);
    handleRemoveMatch(media);
  }

  render() {
    const { showModal, trailerKey, credits, imdbId } = this.state;
    const { media } = this.props;

    const title = media.title ? media.title : media.name;
    const release = media.title
      ? media.release_date
      : media.first_air_date;
    const creditTypeHeader = media.title ? 'Director:' : 'Creator:';
    const creditTypeFooter = media.title ? 'Lead:' : 'Seasons:';

    return (
      <div className="discover-card">
        <div className="poster-info-container">
          <div className="discover-poster">
            <div className="img-container">
              <img
                src={`https://image.tmdb.org/t/p/w154${media.poster_path}`}
                alt={`${title} poster`}
              />
              <span className="rating-tag">
                <h3>{media.vote_average.toFixed(1)}</h3>
              </span>
            </div>
          </div>
          <div className="discover-info">
            <h2>{truncate(title, { length: 50, separator: ' ' })}</h2>
            <h3>
              <span>{creditTypeHeader}</span> {credits.header}
            </h3>
            <h3>{release.substring(0, 4)}</h3>
            <p>
              {truncate(media.overview, { length: 130, separator: ' ' })}
            </p>
          </div>
        </div>
        {/* TODO: make these divs buttons? */}
        <div className="discover-footer">
          <h3><span>{creditTypeFooter}</span> {credits.footer}</h3>
          <div className="buttons">
            <a
              className="imdb"
              target="blank"
              href={`http://www.imdb.com/title/${imdbId}`}
            >
              <Icon icon="text" width="18" height="18" />
              <span className="imdb-tooltip">Imdb</span>
            </a>
            {trailerKey !== null
              ? <div className="trailer" onClick={this.handleTrailerModal}>
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
          <TrailerModal trailerKey={trailerKey} />
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
  currentPage: PropTypes.number.isRequired,
  handleRemoveMatch: PropTypes.func.isRequired
};
