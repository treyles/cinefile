// TODO: add timer after each fetch, default to false?

import React from 'react';
import PropTypes from 'prop-types';
import FlipMove from 'react-flip-move';
import MediaQuery from 'react-responsive';
import DiscoverCard from './DiscoverCard';
import Header from './Header';
import OptionsModal from './OptionsModal';
import { fetchDiscover, buildDiscoverData } from '../utils/Api';
import Icon from '../utils/Icon';

const defaultQuery = {
  page: 1,
  score: 7,
  mediaType: 'movie',
  sort: { value: 'popularity.desc', label: 'Popularity Descending' },
  releaseDates: [1960, new Date().getFullYear()],
  genre: [{ value: 878, label: 'Science Fiction' }]
};

export default class Discover extends React.Component {
  constructor(props) {
    super(props);

    this.lsData = JSON.parse(localStorage.getItem('discover-data'));
    this.lsQuery = JSON.parse(localStorage.getItem('discover-query'));

    this.state = {
      matches: [],
      pages: null,
      showModal: false,
      showMoreButton: true,
      query: this.lsQuery || defaultQuery,
      preloader: true
    };

    this.handleShowMore = this.handleShowMore.bind(this);
    this.handleOptionsModal = this.handleOptionsModal.bind(this);
    this.handleQueryUpdate = this.handleQueryUpdate.bind(this);
    this.handleRemoveMatch = this.handleRemoveMatch.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);

    if (this.lsData) {
      this.loadPersistMatchesAndPages();
    } else {
      this.handleQueryUpdate(this.state.query);
    }
  }

  componentWillUpdate(nextProps, nextState) {
    // save query settings
    localStorage.setItem(
      'discover-query',
      JSON.stringify(nextState.query)
    );
  }

  componentWillUnmount() {
    clearTimeout(this.showMoreTimeout);
    this.persistMatcheAndPages();
  }

  // TODO: rename
  persistMatcheAndPages() {
    const { matches, pages } = this.state;

    localStorage.setItem(
      'discover-data',
      JSON.stringify({
        matches: matches.slice(-20),
        pages
      })
    );
  }

  // TODO: rename
  loadPersistMatchesAndPages() {
    const { matches, pages } = this.lsData;
    this.setState({
      matches,
      pages,
      preloader: false
    });
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

  // TODO: rename
  handleQueryUpdate(newQuery) {
    fetchDiscover(newQuery)
      .then(res => {
        this.setState({ pages: res.total_pages });
        return this.filterMatches(res.results);
      })
      .then(res =>
        buildDiscoverData(res).then(response =>
          this.setState({
            matches: response,
            query: newQuery,
            preloader: false
          })
        )
      );
  }

  handleShowMore() {
    const { matches, query } = this.state;

    // hide button and render preloader
    this.toggleShowMoreButton();

    // copy query object, and increment page key
    const newQuery = { ...query, page: query.page + 1 };

    fetchDiscover(newQuery)
      .then(res => this.filterMatches(res.results))
      .then(res =>
        buildDiscoverData(res).then(res => {
          this.setState({
            matches: matches.concat(res),
            query: newQuery
          });

          // bring back button after 8 seconds.
          // due to api limitations and request limits
          // we need to slow down consecutive calls
          this.showMoreTimeout = setTimeout(
            () => this.toggleShowMoreButton(),
            8000
          );
        })
      );
  }

  handleOptionsModal() {
    this.setState({
      showModal: !this.state.showModal
    });
  }

  toggleShowMoreButton() {
    this.setState({
      showMoreButton: !this.state.showMoreButton
    });
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

  renderLoader(showMoreButton) {
    return (
      <div className={`${showMoreButton ? 'load-more ' : ''}preloader`}>
        <div className="rect1" />
        <div className="rect2" />
        <div className="rect3" />
        <div className="rect4" />
        <div className="rect5" />
      </div>
    );
  }

  render() {
    // TODO: only destructure variables used multiple times?
    const {
      matches,
      query,
      showModal,
      showMoreButton,
      preloader
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
        <h2>We can't find media matching your query</h2>
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
          {preloader && this.renderLoader()}
          {!preloader && !matches.length && noResults}
        </div>
        <div className="options" onClick={this.handleOptionsModal}>
          <Icon icon="menu2" width="25" height="25" />
        </div>
        {/* FlipMove shouldnt be wrapping all the things 
            causes two errors? this looks done?
        */}
        <FlipMove className="discover">
          {/* logic here to fix 'returned zero results' when adding all movies on discover page. */}
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
          {showMoreButton
            ? this.renderShowButton()
            : this.renderLoader(true)}
        </div>
        {showModal && (
          <OptionsModal
            handleOptionsModal={this.handleOptionsModal}
            handleQueryUpdate={this.handleQueryUpdate}
          />
        )}
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
