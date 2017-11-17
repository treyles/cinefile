import React from 'react';
import fetchMediaSearch from '../utils/Api';
import SearchResultList from './SearchResultList';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      matches: null
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.searchInput.focus();
  }

  handleSubmit(e) {
    if (e.key === 'Enter') {
      fetchMediaSearch(e.target.value).then(results =>
        this.setState({
          // filter to return movies and tv shows only
          matches: results.filter(media => media.media_type !== 'person')
        }));
      this.searchInput.blur();
    }
  }

  renderSearchResults() {
    const { matches } = this.state;
    if (matches && matches.length > 0) {
      return (
        <SearchResultList
          media={matches}
          updateLibrary={this.props.updateLibrary}
        />
      );
    }
    if (!matches) {
      return;
    }
    return <h1 className="zero-results">Your search returned zero results</h1>;
  }

  render() {
    return (
      <div className="search">
        <input
          onKeyPress={this.handleSubmit}
          type="search"
          placeholder="Search"
          ref={input => {
            this.searchInput = input;
          }}
        />
        {this.renderSearchResults()}
      </div>
    );
  }
}

export default Search;
