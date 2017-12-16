import React from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import DiscoverCard from './DiscoverCard';
import OptionsModal from './OptionsModal';
import { fetchDiscover } from '../utils/Api';
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
    this.state = {
      matches: [],
      pages: null,
      showModal: false,
      showMoreButton: true,
      query: {}
    };

    this.lsQuery = JSON.parse(localStorage.getItem('discover-query'));
    this.handleShowMore = this.handleShowMore.bind(this);
    this.handleOptionsModal = this.handleOptionsModal.bind(this);
    this.handleQueryUpdate = this.handleQueryUpdate.bind(this);
    this.handleRemoveMatch = this.handleRemoveMatch.bind(this);
  }

  componentDidMount() {
    this.mounted = true;
    window.scrollTo(0, 0);

    const query = this.lsQuery ? this.lsQuery : defaultQuery;
    this.handleQueryUpdate(query);
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
      result =>
        this.props.library.findIndex(el => el.id === result.id) === -1
    );
  }

  renderShowButton() {
    const { query, pages, matches } = this.state;

    if (query.page === pages) {
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
    const { matches, query, showModal, showMoreButton } = this.state;
    const { addToLibrary } = this.props;

    const loader = (
      <div className="load-more loader">
        <div className="rect1" />
        <div className="rect2" />
        <div className="rect3" />
        <div className="rect4" />
        <div className="rect5" />
      </div>
    );

    return (
      <div className="discover">
        <div className="options" onClick={this.handleOptionsModal}>
          <Icon icon="menu2" width="25" height="25" />
        </div>
        {/* logic here to fix 'returned zero results' when adding all movies on discover page. */}
        {this.mounted && !matches.length
          ? <h1>Your query returned zero results</h1>
          : matches.map(media => (
              <DiscoverCard
                key={media.id}
                media={media}
                addToLibrary={addToLibrary}
                currentPage={query.page}
                handleRemoveMatch={this.handleRemoveMatch}
              />
            ))}
        {showMoreButton ? this.renderShowButton() : loader}
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
