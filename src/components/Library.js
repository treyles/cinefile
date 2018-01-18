import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import LibraryCard from './LibraryCard';
import Search from './Search';
import rebase from '../utils/base';
import FlipMove from 'react-flip-move';
import Icon from '../utils/Icon';
import MediaQuery from 'react-responsive';

export default class Library extends React.Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  componentWillMount() {
    // TODO: rename mount to isCounterActive...?
    this.mounted = true;
  }
  componentWillUnmount() {
    this.mounted = false;
  }

  renderLobby(content) {
    return (
      <div className="lobby">
        {content}
      </div>
    );
  }

  render() {
    const {
      library,
      removeFromLibrary,
      addToLibrary,
      isSearchActive,
      toggleSearchButton,
      currentUser,
      loading
    } = this.props;

    const preloader = (
      <div className="preloader">
        <div className="rect1" />
        <div className="rect2" />
        <div className="rect3" />
        <div className="rect4" />
        <div className="rect5" />
      </div>
    );
    const isEmpty = (
      <div className="empty-message">
        <div className="empty-bg">
          <Icon icon="empty" width="130" height="100%" />
        </div>
        <h1>
          {
            `Let's get started ${currentUser.displayName && currentUser.displayName.split(' ')[0]}!`
          }
        </h1>
        <MediaQuery minWidth={768}>
          <h2>
            Browse Discover or click "+" to add movies and TV shows.
          </h2>
        </MediaQuery>
        <MediaQuery maxWidth={768}>
          <h2>
            Browse Discover, or search to add movies and TV shows.
          </h2>
        </MediaQuery>
        <button
          className="load-samples"
          onClick={() => this.props.addRecommended()}
        >
          <h2>Add Recommendations</h2>
        </button>
      </div>
    );

    return (
      <div>
        {loading && this.renderLobby(preloader)}
        {!loading &&
          !library.length &&
          !isSearchActive &&
          this.renderLobby(isEmpty)}
        <Header
          count={library.length}
          toggleSearchButton={toggleSearchButton}
          isSearchActive={isSearchActive}
          currentUser={currentUser}
          isLibraryMounted={this.mounted}
        />
        <div className="library-container">
          {isSearchActive &&
            <Search
              addToLibrary={addToLibrary}
              toggleSearchButton={toggleSearchButton}
              removeFromLibrary={removeFromLibrary}
              library={library}
            />}
          <FlipMove className="library">
            {library.map(media => (
              <LibraryCard
                key={media.id}
                media={media}
                removeFromLibrary={removeFromLibrary}
              />
            ))}
          </FlipMove>
        </div>
      </div>
    );
  }
}

Library.propTypes = {
  library: PropTypes.arrayOf(PropTypes.object),
  removeFromLibrary: PropTypes.func.isRequired,
  addToLibrary: PropTypes.func.isRequired,
  isSearchActive: PropTypes.bool.isRequired,
  toggleSearchButton: PropTypes.func.isRequired
};

Library.defaultProps = {
  library: []
};
