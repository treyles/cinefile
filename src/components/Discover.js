import React from 'react';
import PropTypes from 'prop-types';
import FlipMove from 'react-flip-move';
import MediaQuery from 'react-responsive';
import DiscoverCard from './DiscoverCard';
import Header from './Header';
import OptionsModal from './OptionsModal';
import { fetchDiscover, buildDiscoverData } from '../utils/Api';
import Icon from '../utils/Icon';
import Loader from '../utils/Loader';

const defaultQuery = {
  page: 1,
  score: 7,
  mediaType: 'movie',
  sort: { value: 'popularity.desc', label: 'Popularity Descending' },
  releaseDates: [1960, new Date().getFullYear()],
  genre: [{ value: 878, label: 'Science Fiction' }]
};

function store(key, data) {
  if (arguments.length > 1) {
    return localStorage.setItem(key, JSON.stringify(data));
  }
  return JSON.parse(localStorage.getItem(key));
}

export default class Discover extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      apiReady: true,
      preloader: false,
      matches: store('discover-matches') || [],
      query: store('discover-query') || defaultQuery,
      pages: store('discover-pages') || null
    };

    this.handleShowMore = this.handleShowMore.bind(this);
    this.handleOptionsModal = this.handleOptionsModal.bind(this);
    this.handleQueryUpdate = this.handleQueryUpdate.bind(this);
    this.handleRemoveMatch = this.handleRemoveMatch.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    const storeMatches = store('discover-matches');

    if (!storeMatches) {
      this.handleQueryUpdate(this.state.query);
    }
  }

  componentWillUpdate(nextProps, nextState) {
    store('discover-matches', nextState.matches.slice(-20));
    store('discover-query', nextState.query);
    store('discover-pages', nextState.pages);
  }

  componentWillUnmount() {
    clearTimeout(this.showMoreTimeout);
  }

  // TODO: just use this.filterMatches?
  handleRemoveMatch(media) {
    const { matches } = this.state;
    const mediaIndex = matches.indexOf(media);

    if (mediaIndex > -1) {
      this.setState({
        matches: matches
          .slice(0, mediaIndex)
          .concat(matches.slice(mediaIndex + 1))
      });
    }
  }

  handleQueryUpdate(newQuery) {
    // clear previous cards
    this.setState({
      matches: [],
      preloader: true
    });

    fetchDiscover(newQuery)
      .then(res => {
        this.setState({ pages: res.total_pages });
        return this.filterMatches(res.results);
      })
      .then(res =>
        buildDiscoverData(res).then(response => {
          this.setState({
            matches: response,
            query: newQuery,
            preloader: false
          });
          this.apiTimer();
        })
      );
  }

  handleShowMore() {
    const { matches, query } = this.state;
    // copy query object, and increment page
    const newQuery = { ...query, page: query.page + 1 };

    this.apiTimer();

    fetchDiscover(newQuery)
      .then(res => this.filterMatches(res.results))
      .then(res =>
        buildDiscoverData(res).then(response =>
          this.setState({
            matches: matches.concat(response),
            query: newQuery
          })
        )
      );
  }

  handleOptionsModal() {
    this.setState({
      showModal: !this.state.showModal
    });
  }

  /**
   * set boolean to disable/enable buttons
   * that make api calls to The Movie Database.
   * due to api limitations and request limits
   * we need to slow down consecutive calls
   * with an 8 second delay
   */
  apiTimer() {
    this.setState({ apiReady: false });

    this.showMoreTimeout = setTimeout(
      () => this.setState({ apiReady: true }),
      8000
    );
  }

  // filter to return media not already in library
  filterMatches(results) {
    return results.filter(
      result =>
        this.props.library.findIndex(el => el.id === result.id) === -1
    );
  }

  renderShowButton() {
    const { query, pages, matches } = this.state;

    if (query.page === pages && matches.length) {
      return (
        <div className="load-more end-list">
          <h2>You have reached the end of the list</h2>
        </div>
      );
    }

    if (matches.length) {
      return (
        <button className="load-more" onClick={this.handleShowMore}>
          <h2>Show More</h2>
        </button>
      );
    }
  }

  render() {
    // TODO: only destructure variables used multiple times?
    const {
      matches,
      query,
      showModal,
      apiReady,
      preloader,
      pages
    } = this.state;

    const {
      library,
      addToLibrary,
      toggleSearchButton,
      isSearchActive,
      currentUser
    } = this.props;

    const noResults = (
      <div className="empty-message">
        <div className="illustration">
          <MediaQuery minWidth={768}>
            <Icon icon="sad" width="218" height="100%" />
          </MediaQuery>
          <MediaQuery maxWidth={768}>
            <Icon icon="sadMobile" width="137" height="100%" />
          </MediaQuery>
        </div>
        <h1>No Results Found!</h1>
        <h2>We can&apos;t find media matching your query</h2>
      </div>
    );

    return (
      <div>
        <Header
          count={library.length}
          toggleSearchButton={toggleSearchButton}
          isSearchActive={isSearchActive}
          currentUser={currentUser}
        />
        <div className="lobby">
          {preloader && <Loader />}
          {!preloader && !matches.length && noResults}
        </div>
        <button className="options" onClick={this.handleOptionsModal}>
          <Icon icon="menu2" width="25" height="25" />
        </button>
        <FlipMove className="discover" leaveAnimation="none">
          {matches.map(media => (
            <DiscoverCard
              key={media.data.id}
              media={media}
              addToLibrary={addToLibrary}
              currentPage={query.page}
              handleRemoveMatch={this.handleRemoveMatch}
            />
          ))}
        </FlipMove>
        <div className="load-more-container">
          {apiReady || (!apiReady && query.page === pages) ? (
            this.renderShowButton()
          ) : (
            <Loader showMoreButton />
          )}
        </div>
        {showModal && (
          <OptionsModal
            handleOptionsModal={this.handleOptionsModal}
            handleQueryUpdate={this.handleQueryUpdate}
            apiReady={apiReady}
          />
        )}
      </div>
    );
  }
}

Discover.propTypes = {
  library: PropTypes.arrayOf(PropTypes.object),
  addToLibrary: PropTypes.func.isRequired,
  toggleSearchButton: PropTypes.func.isRequired,
  isSearchActive: PropTypes.bool.isRequired,
  currentUser: PropTypes.oneOfType([PropTypes.bool, PropTypes.object])
    .isRequired
};

Discover.defaultProps = {
  library: []
};
