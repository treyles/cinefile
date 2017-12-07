import React from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import truncate from 'lodash/truncate';
import { fetchImdbLink, fetchTrailer } from '../utils/Api';
import Icon from '../utils/Icon';
import TrailerModal from './TrailerModal';

export default class DiscoverCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      imdbLink: null,
      trailerLink: null
    };

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

  handleTrailerModal() {
    this.setState({
      showModal: !this.state.showModal
    });
  }

  render() {
    const { showModal, imdbLink, trailerLink } = this.state;
    const { media, addToLibrary } = this.props;

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
              <span>Director:</span> Christopher Nolan
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
        <div className="discover-footer">
          <h3><span>Lead:</span> Leonardo DiCaprio</h3>
          <div className="buttons">
            <a className="imdb" href={imdbLink} target="blank">
              <Icon icon="text" width="18" height="18" />
              <span className="imdb-tooltip">Imdb</span>
            </a>

            <div className="trailer" onClick={this.handleTrailerModal}>
              <Icon icon="preview" width="21" height="21" />
              <span className="trailer-tooltip">Trailer</span>
            </div>

            <div
              className="add"
              onClick={() => {
                addToLibrary(media);
              }}
            >
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
  addToLibrary: PropTypes.func.isRequired
};
