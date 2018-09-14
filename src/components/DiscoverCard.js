import React from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import truncate from 'lodash/truncate';
import Icon from '../utils/Icon';
import TrailerModal from './TrailerModal';

export default class DiscoverCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...props.media, showModal: false };

    this.handleTrailerModal = this.handleTrailerModal.bind(this);
    this.handleAddToLibrary = this.handleAddToLibrary.bind(this);
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
    const { data, showModal, trailerKey, credits, imdbId } = this.state;

    const title = data.title ? data.title : data.name;
    const release = data.title ? data.release_date : data.first_air_date;
    const creditTypeHeader = data.title ? 'Director:' : 'Creator:';
    const creditTypeFooter = data.title ? 'Lead:' : 'Seasons:';

    return (
      <div className="discover-card">
        <div className="poster-info-container">
          <div className="discover-poster">
            <div className="img-container">
              <img
                src={`https://image.tmdb.org/t/p/w154${data.poster_path}`}
                alt={`${title} poster`}
              />
              <span className="rating-tag">
                <h3>{data.vote_average.toFixed(1)}</h3>
              </span>
            </div>
          </div>
          <div className="discover-header">
            <h4>{truncate(title, { length: 50, separator: ' ' })}</h4>
            <h3>
              <span>{creditTypeHeader}</span> {credits.header}
            </h3>
            <h3>{release.substring(0, 4)}</h3>
            <p>
              {truncate(data.overview, { length: 125, separator: ' ' })}
            </p>
          </div>
        </div>
        {/* TODO: make these divs buttons? */}
        <div className="discover-footer">
          <h3>
            <span>{creditTypeFooter}</span> {credits.footer}
          </h3>
          <div className="buttons">
            <a
              className="imdb"
              target="blank"
              href={`http://www.imdb.com/title/${imdbId}`}
            >
              <Icon icon="text" width="18" height="18" />
              <span className="imdb-tooltip">Imdb</span>
            </a>
            {trailerKey !== null ? (
              <button
                className="trailer"
                onClick={this.handleTrailerModal}
              >
                <Icon icon="preview" width="21" height="21" />
                <span className="trailer-tooltip">Trailer</span>
              </button>
            ) : null}
            <button className="add" onClick={this.handleAddToLibrary}>
              <Icon icon="archive" width="18" height="18" />
              <span className="add-tooltip">Add to library</span>
            </button>
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
    credits: PropTypes.object,
    data: PropTypes.object,
    imdbId: PropTypes.string,
    trailerKeya: PropTypes.string
  }).isRequired,
  addToLibrary: PropTypes.func.isRequired,
  handleRemoveMatch: PropTypes.func.isRequired
};

// // TODO: REFACTOR THIS MESS
// // abstract out to new component above? (return obj)
// let mediaCredits;
// const credit = response.credits;
// const trailer = response.videos.results;

// const imdb = response.imdb_id
//   ? response.imdb_id
//   : response.external_ids.imdb_id;

// // arrays
// const getDirector = credit.crew.filter(el => el.job === 'Director');

// // console.log(credit.cast);
// // find smallest 'order' number then get object
// const findLead = Math.min(...credit.cast.map(el => el.order));
// const getLead = credit.cast.filter(el => el.order === findLead);

// // response.title is unique to movies
// if (response.title) {
//   mediaCredits = {
//     header: getDirector.length ? getDirector[0].name : 'n/a',
//     // header: credit.crew.length ? getDirector[0].name : 'n/a',
//     // TODO: get smallest order #, cant rely on < 3
//     footer: getLead.length ? getLead[0].name : 'n/a'
//   };
//   // if television
// } else {
//   mediaCredits = {
//     header: response.created_by.length
//       ? response.created_by[0].name
//       : 'n/a',
//     footer: response.number_of_seasons
//   };
// }

// this.setState({
//         data: response,
//         imdbId: imdb,
//         credits: mediaCredits,
//         trailerKey: trailer.length ? trailer[0].key : null
//       });
