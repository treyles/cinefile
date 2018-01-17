import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import LibraryCard from './LibraryCard';
import Search from './Search';
import rebase from '../utils/base';
import FlipMove from 'react-flip-move';

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
    const isEmpty = <h1 className="stuffs">your shit is empty</h1>;

    return (
      <div>
        {loading && this.renderLobby(preloader)}
        {!loading && !library.length && this.renderLobby(isEmpty)}
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
