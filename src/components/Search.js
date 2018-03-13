import React from 'react';
import PropTypes from 'prop-types';
import { fetchMediaSearch, fetchMediaDetails } from '../utils/Api';
import SearchResultList from './SearchResultList';

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      matches: null,
      inputActive: true,
      matchIndex: -1,
      value: ''
    };

    // this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  componentDidMount() {
    this.searchInput.focus();
  }

  // TODO: refactor
  handleChange(e) {
    if (!e.target.value) {
      this.setState({
        matches: null,
        inputActive: true,
        matchIndex: -1,
        value: ''
      });

      return;
    }

    this.setState({
      inputActive: false,
      value: e.target.value
    });
    this.searchApi(e.target.value);
  }

  handleKeyDown(e) {
    switch (e.key) {
      case 'ArrowDown': {
        this.selectMatch(true);
        break;
      }
      case 'ArrowUp': {
        this.selectMatch(false);
        break;
      }
      case 'Enter': {
        const match = this.state.matches.find(mtch => mtch.selected);
        if (match) {
          this.handleSelect(match, match.inLibrary);
        }
        break;
      }
      case 'Escape': {
        this.setState({ matches: null, matchIndex: -1 });
        break;
      }
      default: {
        break;
      }
    }
  }

  selectMatch(isDown) {
    let { matchIndex, matches, value } = this.state;

    if (isDown) {
      // length undefined, length of null
      if (!matches.length || matchIndex >= 4) {
        return;
      }

      matchIndex += 1;
    }

    if (!isDown) {
      if (matchIndex <= 0) {
        return;
      }

      matchIndex -= 1;
    }

    /* eslint-disable no-param-reassign */
    matches = matches.map((match, i) => {
      if (i === matchIndex) {
        // select new match
        value = match.title ? match.title : match.name;
        match.selected = true;
      } else if (match.selected) {
        // clear previously selected match
        match.selected = false;
      }

      return match;
    });
    /* eslint-disable no-param-reassign */

    this.setState({ matchIndex, matches, value });
  }

  searchApi(value) {
    fetchMediaSearch(value).then(result =>
      this.setState({ matches: this.filterMatches(result).slice(0, 5) })
    );
  }

  filterMatches(data) {
    const { library } = this.props;

    // filter out people and media without posters
    const filteredArray = data.filter(
      media => media.poster_path !== null && media.media_type !== 'person'
    );

    return filteredArray.map(match => {
      // check if media is already in library
      const inLibrary = library.findIndex(el => el.id === match.id) > -1;

      if (inLibrary) {
        match.inLibrary = true;
      }

      return match;
    });
  }

  handleSelect(match, inLibrary) {
    const { library } = this.props;

    if (inLibrary) {
      const mediaObj = library.find(media => media.id === match.id);
      this.props.removeFromLibrary(mediaObj);
    }

    if (!inLibrary) {
      fetchMediaDetails(match).then(response => {
        this.props.addToLibrary(response);
      });
    }

    this.setState({
      value: '',
      matches: null,
      inputActive: false,
      matchIndex: -1
    });

    this.props.toggleSearchButton(true);
  }

  render() {
    const { matches, inputActive, value } = this.state;

    return (
      <div className="search">
        <input
          className={`search-input ${inputActive ? '' : 'active'}`}
          type="search"
          placeholder="Search"
          value={value}
          onKeyDown={this.handleKeyDown}
          onChange={this.handleChange}
          ref={input => {
            this.searchInput = input;
          }}
        />
        {matches !== null && (
          <SearchResultList
            matches={matches}
            handleSelect={this.handleSelect}
          />
        )}
      </div>
    );
  }
}

Search.propTypes = {
  addToLibrary: PropTypes.func.isRequired,
  removeFromLibrary: PropTypes.func.isRequired,
  toggleSearchButton: PropTypes.func.isRequired
};
