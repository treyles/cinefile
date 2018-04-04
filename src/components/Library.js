import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import LibraryCard from './LibraryCard';
import Search from './Search';
import rebase from '../utils/base';
import FlipMove from 'react-flip-move';
import Icon from '../utils/Icon';
import MediaQuery from 'react-responsive';
import Loader from '../utils/Loader';

function EmptyLibrary({ currentUser, addRecommended }) {
  return (
    <div className="empty-message">
      <div className="illustration">
        <MediaQuery minWidth={768}>
          <Icon icon="empty" width="229" height="100%" />
        </MediaQuery>
        <MediaQuery maxWidth={768}>
          <Icon icon="emptyMobile" width="138" height="100%" />
        </MediaQuery>
      </div>
      <h1>
        {`Let's Get Started, ${currentUser.displayName &&
          currentUser.displayName.split(' ')[0]}!`}
      </h1>

      <MediaQuery minWidth={768}>
        <h2>
          Add movies or TV shows to your library by browsing Discover or by
          clicking the
          <span>
            <Icon icon="hint" width="18" height="18" />
          </span>
          button at the top left corner
        </h2>
      </MediaQuery>

      <MediaQuery maxWidth={768}>
        <h2>Browse Discover, or search to add movies and TV shows.</h2>
      </MediaQuery>

      <button onClick={() => addRecommended()}>
        <h2>I&apos;m Feeling Lazy</h2>
      </button>
    </div>
  );
}

EmptyLibrary.propTypes = {
  currentUser: PropTypes.oneOfType([PropTypes.bool, PropTypes.object])
    .isRequired,
  addRecommended: PropTypes.func.isRequired
};

export default class Library extends React.Component {
  componentWillMount() {
    // TODO: rename mount to isCounterActive...?
    this.mounted = true;
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    const {
      library,
      removeFromLibrary,
      addToLibrary,
      isSearchActive,
      toggleSearchButton,
      currentUser,
      loading,
      addRecommended
    } = this.props;

    return (
      <div>
        <div className="lobby">
          {loading && <Loader />}
          {!loading &&
            !library.length &&
            !isSearchActive && (
              <EmptyLibrary
                currentUser={currentUser}
                addRecommended={addRecommended}
              />
            )}
        </div>
        <Header
          count={library.length}
          toggleSearchButton={toggleSearchButton}
          isSearchActive={isSearchActive}
          currentUser={currentUser}
          isLibraryMounted={this.mounted}
        />
        <div className="library-container">
          {isSearchActive && (
            <Search
              addToLibrary={addToLibrary}
              toggleSearchButton={toggleSearchButton}
              removeFromLibrary={removeFromLibrary}
              library={library}
            />
          )}
          <FlipMove className="library" leaveAnimation="none">
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
  toggleSearchButton: PropTypes.func.isRequired,
  currentUser: PropTypes.oneOfType([PropTypes.bool, PropTypes.object])
    .isRequired,
  loading: PropTypes.bool.isRequired,
  addRecommended: PropTypes.func.isRequired
};

Library.defaultProps = {
  library: []
};
