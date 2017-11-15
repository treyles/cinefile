import React from 'react';
import fetchMovieSearch from '../utils/Api';
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
      fetchMovieSearch(event.target.value).then(results =>
        this.setState({
          searchResults: results
        }));
      this.searchInput.blur();
    }
  }

  componentDidUpdate() {
    console.log(this.state.searchResults);
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
          ? <SearchResultList movies={this.state.searchResults} />
          : null}
      </div>
    );
  }
}

export default Search;
