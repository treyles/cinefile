import React from 'react';
import PropTypes from 'prop-types';
import LibraryCard from './LibraryCard';
import Search from './Search';

export default class Library extends React.Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    const {
      library,
      removeFromLibrary,
      addToLibrary,
      isSearchActive
    } = this.props;

    return (
      <div className="library-container">
        {isSearchActive && <Search addToLibrary={addToLibrary} />}
        <div className="library">
          {library.map(media => (
            <LibraryCard
              key={media.id}
              media={media}
              removeFromLibrary={removeFromLibrary}
            />
          ))}
        </div>
      </div>
    );
  }
}

Library.propTypes = {
  library: PropTypes.arrayOf(PropTypes.object),
  removeFromLibrary: PropTypes.func.isRequired,
  addToLibrary: PropTypes.func.isRequired,
  isSearchActive: PropTypes.bool.isRequired
};

Library.defaultProps = {
  library: []
};
