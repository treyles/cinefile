import React from 'react';
import LibraryCard from './LibraryCard';

class Library extends React.Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div className="library">
        <LibraryCard />
        <LibraryCard />
        <LibraryCard />
        <LibraryCard />
        <LibraryCard />
        <LibraryCard />
        <LibraryCard />
      </div>
    );
  }
}

export default Library;
