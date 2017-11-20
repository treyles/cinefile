import React from 'react';
import PropTypes from 'prop-types';
import fetchMediaSearch from '../utils/Api';
import SearchResultList from './SearchResultList';

function Results({ matches, updateLibrary }) {
  if (matches) {
    if (matches.length) {
      return (
        <SearchResultList
          matches={matches}
          updateLibrary={updateLibrary}
        />
      );
    }
    return (
      <h1 className="zero-results">
        Your search returned zero results
      </h1>
    );
  }
  return null;
}

Results.propTypes = {
  matches: PropTypes.arrayOf(PropTypes.object),
  updateLibrary: PropTypes.func.isRequired
};

Results.defaultProps = {
  matches: []
};

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      matches: null
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.searchInput.focus();
  }

  handleSubmit(e) {
    const { value } = e.target;
    if (e.key === 'Enter' && value) {
      this.searchApi(value);
      this.searchInput.blur();
    }
  }

  searchApi(value) {
    fetchMediaSearch(value).then(result =>
      this.setState({ matches: this.filterMatches(result) }));
  }

  filterMatches(data) {
    return data.filter(
      media => media.poster_path !== null && media.media_type !== 'person'
    );
  }

  render() {
    const { matches } = this.state;
    const { updateLibrary } = this.props;

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
        <Results matches={matches} updateLibrary={updateLibrary} />
      </div>
    );
  }
}

Search.propTypes = {
  updateLibrary: PropTypes.func.isRequired
};

export default Search;
