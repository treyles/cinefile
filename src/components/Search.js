import React from 'react';
import PropTypes from 'prop-types';
import { fetchMediaSearch } from '../utils/Api';
import SearchResultList from './SearchResultList';

function Results({ matches, addToLibrary }) {
  if (matches) {
    if (matches.length) {
      return (
        <SearchResultList matches={matches} addToLibrary={addToLibrary} />
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
  addToLibrary: PropTypes.func.isRequired
};

Results.defaultProps = {
  matches: []
};

export default class Search extends React.Component {
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
      // filter matches to return only movies and tv shows with posters
      media => media.poster_path !== null && media.media_type !== 'person'
    );
  }

  render() {
    const { matches } = this.state;
    const { addToLibrary } = this.props;

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
        <Results matches={matches} addToLibrary={addToLibrary} />
      </div>
    );
  }
}

Search.propTypes = {
  addToLibrary: PropTypes.func.isRequired
};
