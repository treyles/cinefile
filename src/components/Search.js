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
      matches: null,
      inputActive: true
    };

    // this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.searchInput.focus();
  }

  // handleSubmit(e) {
  //   const { value } = e.target;
  //   if (e.key === 'Enter' && value) {
  //     this.searchApi(value);
  //     this.searchInput.blur();
  //   }
  // }

  handleChange(e) {
    if (!e.target.value) {
      this.setState({
        matches: null,
        inputActive: true
      });

      return;
    }

    this.setState({ inputActive: false });
    this.searchApi(e.target.value);
  }

  searchApi(value) {
    fetchMediaSearch(value).then(result =>
      this.setState({ matches: this.filterMatches(result).slice(0, 5) }));
  }

  filterMatches(data) {
    return data.filter(
      // filter out people and media without posters
      media => media.poster_path !== null && media.media_type !== 'person'
    );
  }

  render() {
    const { matches, inputActive } = this.state;
    const { addToLibrary, searchClicked } = this.props;

    return (
      <div className="search">
        <input
          className={`search-input ${inputActive ? '' : 'active'}`}
          onChange={this.handleChange}
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
