import React from "react";
import PropTypes from "prop-types";
// import ReactModal from 'react-modal';
import DiscoverCard from "./DiscoverCard";
import Header from "./Header";
import OptionsModal from "./OptionsModal";
import { fetchDiscover } from "../utils/Api";
import Icon from "../utils/Icon";
import FlipMove from "react-flip-move";
import MediaQuery from "react-responsive";

const defaultQuery = {
  page: 1,
  score: 7,
  mediaType: "movie",
  sort: { value: "popularity.desc", label: "Popularity Descending" },
  releaseDates: [1960, new Date().getFullYear()],
  genre: [{ value: 878, label: "Science Fiction" }]
};

export default class Discover extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      matches: [],
      pages: null,
      showModal: false,
      showMoreButton: true,
      query: {},
      preloader: true
    };

    this.lsQuery = JSON.parse(localStorage.getItem("discover-query"));
    this.handleShowMore = this.handleShowMore.bind(this);
    this.handleOptionsModal = this.handleOptionsModal.bind(this);
    this.handleQueryUpdate = this.handleQueryUpdate.bind(this);
    this.handleRemoveMatch = this.handleRemoveMatch.bind(this);
  }

  componentDidMount() {
    // debugger;
    // this.mounted = true;
    window.scrollTo(0, 0);
    const query = this.lsQuery ? this.lsQuery : defaultQuery;
    this.handleQueryUpdate(query);
  }

  componentWillUpdate(nextProps, nextState) {
    localStorage.setItem("discover-query", JSON.stringify(nextState.query));
  }

  componentWillUnmount() {
    // this.mounted = false;
    clearTimeout(this.showMoreTimeout);
  }

  // handleTouchMove(e) {
  //   e.preventDefault();
  // }

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
    fetchDiscover(newQuery).then(response => {
      const newMatches = this.filterMatches(response.results);

      this.setState({
        matches: newMatches,
        pages: response.total_pages,
        query: newQuery,
        preloader: false
      });
    });
  }

  handleShowMore() {
    const { matches, query } = this.state;

    // hide button and render preloader
    this.toggleShowMoreButton();

    // copy object without mutating
    const newQuery = Object.assign({}, query, {
      page: query.page + 1
    });

    fetchDiscover(newQuery).then(response => {
      const newMatches = this.filterMatches(response.results);
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
      result => this.props.library.findIndex(el => el.id === result.id) === -1
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
      <div className={`${showMoreButton ? "load-more " : ""}preloader`}>
        <div className="rect1" />
        <div className="rect2" />
        <div className="rect3" />
        <div className="rect4" />
        <div className="rect5" />
      </div>
    );
  }

  render() {
    const { matches, query, showModal, showMoreButton, preloader } = this.state;
    const {
      library,
      addToLibrary,
      toggleSearchButton,
      isSearchActive,
      currentUser
    } = this.props;

    // const stopScroll = {
    //   display: 'none'
    // };

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
            causes two errors?
        */}
        <FlipMove className="discover">
          {/* logic here to fix 'returned zero results' when adding all movies on discover page. */}
          {matches.map(media => (
            <DiscoverCard
              key={media.id}
              media={media}
              addToLibrary={addToLibrary}
              currentPage={query.page}
              handleRemoveMatch={this.handleRemoveMatch}
            />
          ))}
        </FlipMove>
        <div className="load-more-container">
          {showMoreButton ? this.renderShowButton() : this.renderLoader(true)}
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

/*
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
*/

Discover.propTypes = {
  library: PropTypes.arrayOf(PropTypes.object),
  addToLibrary: PropTypes.func.isRequired
};

Discover.defaultProps = {
  library: []
};
