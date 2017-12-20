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
        // debugger;
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
      if (!matches.length || matchIndex >= matches.length - 1) {
        return;
      }

      matchIndex++;
    }

    if (!isDown) {
      if (matchIndex <= 0) {
        return;
      }

      matchIndex--;
    }

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

    this.setState({ matchIndex, matches, value });
  }

  searchApi(value) {
    fetchMediaSearch(value).then(result =>
      this.setState({ matches: this.filterMatches(result).slice(0, 5) }));
  }

  filterMatches(data) {
    const { library } = this.props;

    const filteredArray = data.filter(
      // filter out people and media without posters
      media => media.poster_path !== null && media.media_type !== 'person'
    );

    return filteredArray.map(match => {
      // const mediaIndex = library.indexOf(match);
      const inLibrary = library.findIndex(el => el.id === match.id) > -1;

      if (inLibrary) {
        match.inLibrary = true;
      }

      return match;
    });
  }

  handleSelect(media, inLibrary) {
    fetchMediaDetails(media).then(response => {
      if (inLibrary) {
        this.props.removeFromLibrary(response);
        console.log('removed from library');
      } else {
        this.props.addToLibrary(response);
        console.log('added to library');
      }
    });

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
    // const { searchClicked } = this.props;

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
        {matches !== null &&
          <SearchResultList
            matches={matches}
            handleSelect={this.handleSelect}
          />}
      </div>
    );
  }
}

Search.propTypes = {
  addToLibrary: PropTypes.func.isRequired,
  removeFromLibrary: PropTypes.func.isRequired,
  toggleSearchButton: PropTypes.func.isRequired
};
