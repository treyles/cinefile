import React from 'react';
import fetchMediaSearch from '../utils/Api';
import SearchResultList from './SearchResultList';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: null
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.searchInput.focus();
  }

  handleSubmit(event) {
    if (event.key === 'Enter') {
      fetchMediaSearch(event.target.value).then(results =>
        this.setState({
          // filter to return movies and tv shows only
          searchResults: results.filter(media => media.media_type !== 'person')
        }));
      this.searchInput.blur();
    }
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
        {this.state.searchResults
          ? <SearchResultList media={this.state.searchResults} />
          : null}
      </div>
    );
  }
}

export default Search;
