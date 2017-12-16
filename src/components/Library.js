import React from 'react';
import PropTypes from 'prop-types';
import LibraryCard from './LibraryCard';
import Search from './Search';

export default class Library extends React.Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    const { library, removeFromLibrary, addToLibrary } = this.props;

    return (
      <div className="library-container">
        <Search addToLibrary={addToLibrary} />
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
  removeFromLibrary: PropTypes.func.isRequired
};

Library.defaultProps = {
  library: []
};
