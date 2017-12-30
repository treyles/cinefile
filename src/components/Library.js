import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import LibraryCard from './LibraryCard';
import Search from './Search';
import rebase from '../utils/base';

export default class Library extends React.Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    const {
      library,
      removeFromLibrary,
      addToLibrary,
      isSearchActive,
      toggleSearchButton,
      currentUser
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

    return (
      <div>
        <Header
          count={library.length}
          toggleSearchButton={toggleSearchButton}
          isSearchActive={isSearchActive}
          currentUser={currentUser}
        />
        <div className="library-container">
          {isSearchActive &&
            <Search
              addToLibrary={addToLibrary}
              toggleSearchButton={toggleSearchButton}
              removeFromLibrary={removeFromLibrary}
              library={library}
            />}
          <div className="library">
            {!library.length && preloader}
            {library.map(media => (
              <LibraryCard
                key={media.id}
                media={media}
                removeFromLibrary={removeFromLibrary}
              />
            ))}
          </div>
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
