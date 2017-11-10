import React from 'react';

class Search extends React.Component {
  componentDidMount() {
    this.searchInput.focus();
  }

  render() {
    return (
      <div className="search">
        <input
          type="search"
          placeholder="Search"
          ref={input => {
            this.searchInput = input;
          }}
        />
      </div>
    );
  }
}

export default Search;
