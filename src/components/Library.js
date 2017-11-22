import React from 'react';
import PropTypes from 'prop-types';
import LibraryCard from './LibraryCard';

export default class Library extends React.Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    const { library, updateLibrary } = this.props;

    return (
      <div className="library">
        {library.map(media => (
          <LibraryCard
            key={media.id}
            media={media}
            updateLibrary={updateLibrary}
          />
        ))}
      </div>
    );
  }
}

Library.propTypes = {
  library: PropTypes.arrayOf(PropTypes.object),
  updateLibrary: PropTypes.func.isRequired
};

Library.defaultProps = {
  library: []
};
