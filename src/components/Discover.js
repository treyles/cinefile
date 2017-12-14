import React from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import DiscoverCard from './DiscoverCard';
import OptionsModal from './OptionsModal';
import { fetchDiscover } from '../utils/Api';
import Icon from '../utils/Icon';

function ShowMoreButton({ query, pages, matches, handleShowMore }) {
  if (query.page !== pages && matches.length !== 0) {
    return (
      <button className="load-more" onClick={() => handleShowMore()}>
        <h2>Show More</h2>
      </button>
    );
  }
  return null;
}

ShowMoreButton.propTypes = {
  query: PropTypes.shape({
    page: PropTypes.number
  }).isRequired,
  pages: PropTypes.number,
  matches: PropTypes.array.isRequired,
  handleShowMore: PropTypes.func.isRequired
};

ShowMoreButton.defaultProps = {
  pages: 1
};

function Loader() {
  return (
    <div className="load-more loader">
      <div className="rect1" />
      <div className="rect2" />
      <div className="rect3" />
      <div className="rect4" />
      <div className="rect5" />
    </div>
  );
}

export default class Discover extends React.Component {
  constructor(props) {
    super(props);
    this.currentYear = new Date().getFullYear();
    this.state = {
      matches: [],
      pages: null,
      showModal: false,
      showMoreButton: true,
      // defaultQuery: {
      //   mediaType: 'movie',
      //   page: 1,
      //   sort: 'popularity.desc',
      //   releaseFrom: 1960,
      //   releaseTo: 2017,
      //   score: 7,
      //   genre: '878'
      // },
      defaultQuery: {
        mediaType: 'movie',
        page: 1,
        score: 7,
        sort: { value: 'popularity.desc', label: 'Popularity Descending' },
        releaseDates: [1960, this.currentYear],
        genre: [{ value: 878, label: 'Science Fiction' }]
      },
      query: {}
    };

    this.handleShowMore = this.handleShowMore.bind(this);
    this.handleOptionsModal = this.handleOptionsModal.bind(this);
    this.handleQueryUpdate = this.handleQueryUpdate.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.mounted = true;

    const lsQuery = JSON.parse(localStorage.getItem('discover-query'));

    if (lsQuery) {
      // render last page viewed
      this.handleQueryUpdate(lsQuery);
    } else {
      this.handleQueryUpdate(this.state.defaultQuery);
    }
  }

  componentWillUpdate(nextProps, nextState) {
    localStorage.setItem(
      'discover-query',
      JSON.stringify(nextState.query)
    );
  }

  componentWillUnmount() {
    this.mounted = false;
    clearTimeout(this.showMoreTimeout);
  }

  // filter to return media not already in library
  handleResultFilter(results) {
    return results.filter(
      result =>
        this.props.library.findIndex(el => el.id === result.id) === -1
    );
  }

  handleQueryUpdate(newQuery) {
    fetchDiscover(newQuery).then(response => {
      const newMatches = this.handleResultFilter(response.results);

      this.setState({
        matches: newMatches,
        pages: response.total_pages,
        query: newQuery
      });
    });
  }

  handleShowMore() {
    const { matches, query } = this.state;

    // hide button and render loader
    this.toggleShowMoreButton();

    // copy object without mutating
    const newQuery = Object.assign({}, query, {
      page: query.page + 1
    });

    fetchDiscover(newQuery).then(response => {
      const newMatches = this.handleResultFilter(response.results);
      this.setState({
        matches: matches.concat(newMatches),
        query: newQuery
      });

      // bring back button after 8 seconds
      // due to api request limits we need to slow down consecutive calls
      this.showMoreTimeout = setTimeout(
        () => this.toggleShowMoreButton(),
        8000
      );
    });
  }

  toggleShowMoreButton() {
    this.setState({
      showMoreButton: !this.state.showMoreButton
    });
  }

  handleOptionsModal() {
    this.setState({
      showModal: !this.state.showModal
    });
  }

  render() {
    const {
      matches,
      query,
      pages,
      showModal,
      showMoreButton
    } = this.state;
    const { addToLibrary } = this.props;

    return (
      <div className="discover">
        <div className="options" onClick={this.handleOptionsModal}>
          <Icon icon="menu2" width="25" height="25" />
        </div>
        {this.mounted && !matches.length
          ? <h1>Your query returned zero results</h1>
          : matches.map(media => (
              <DiscoverCard
                key={media.id}
                media={media}
                addToLibrary={addToLibrary}
                currentPage={query.page}
              />
            ))}
        {showMoreButton
          ? <ShowMoreButton
              query={query}
              pages={pages}
              matches={matches}
              handleShowMore={this.handleShowMore}
            />
          : <Loader />}
        <ReactModal
          isOpen={showModal}
          onRequestClose={this.handleOptionsModal}
          className="options-modal"
          overlayClassName="options-modal-overlay"
        >
          <OptionsModal
            handleOptionsModal={this.handleOptionsModal}
            handleQueryUpdate={this.handleQueryUpdate}
          />
        </ReactModal>
      </div>
    );
  }
}

Discover.propTypes = {
  library: PropTypes.arrayOf(PropTypes.object),
  addToLibrary: PropTypes.func.isRequired
};

Discover.defaultProps = {
  library: []
};
