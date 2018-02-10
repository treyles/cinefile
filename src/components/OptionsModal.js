import React from 'react';
import PropTypes from 'prop-types';
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import data from '../data/options.json';

export default class OptionsModal extends React.Component {
  constructor(props) {
    super(props);
    this.currentYear = new Date().getFullYear();
    this.lsQuery = JSON.parse(localStorage.getItem('discover-query'));
    this.state = this.lsQuery;

    this.handleActiveTab = this.handleActiveTab.bind(this);
    this.handleRatingValue = this.handleRatingValue.bind(this);
    this.handleReleaseDateValue = this.handleReleaseDateValue.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleSortChange = this.handleSortChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderValue = this.renderValue.bind(this);
  }

  handleActiveTab(e) {
    // reset drop down selectors
    this.setState({
      mediaType: e.target.className,
      genre: [],
      sort: { value: 'popularity.desc', label: 'Popularity Descending' }
    });
  }

  handleRatingValue(value) {
    this.setState({ score: value });
  }

  handleReleaseDateValue(value) {
    this.setState({ releaseDates: value });
  }

  handleSelectChange(value) {
    this.setState({ genre: value });
  }

  handleSortChange(value) {
    this.setState({ sort: value });
  }

  renderValue(option) {
    return (
      <h2 style={{ color: '#3f3f3f', fontSize: '17px' }}>
        {option.label}
      </h2>
    );
  }

  handleSubmit() {
    const { sort } = this.state;
    const { handleQueryUpdate, handleOptionsModal } = this.props;
    // close modal on submit
    handleOptionsModal();

    const newQuery = Object.assign({}, this.state, {
      sort: sort === null ? this.lsQuery.sort : sort,
      page: 1
    });

    handleQueryUpdate(newQuery);
  }

  render() {
    const { mediaType, score, releaseDates, genre, sort } = this.state;
    const { handleOptionsModal } = this.props;

    // data for select dropdowns
    const genreData =
      mediaType === 'movie' ? data.moviesGenres : data.tvGenres;
    const sortData = mediaType === 'movie' ? data.moviesSort : data.tvSort;

    // rc-slider styles
    const trackStyle = [
      {
        backgroundColor: '#0f96ea',
        height: 6
      }
    ]; // #0f96ea #007cd9
    const railStyle = {
      backgroundColor: '#eee',
      height: 6
    };

    const handleStyle = {
      border: '5px solid #0f96ea',
      height: 20,
      width: 20,
      marginTop: -7,
      backgroundColor: '#fff',
      boxShadow: 'none'
    };

    return (
      <div className="options-modal">
        {/* TODO: what's up with spacing in className here? */}

        <div className="slider-container">
          <div className="slider-text">
            <h1>Rating</h1>
            <h1 className="numbers">{score}</h1>
          </div>
          <h2>Minimum rating</h2>
          <Slider
            min={0}
            max={10}
            defaultValue={score}
            trackStyle={trackStyle}
            railStyle={railStyle}
            handleStyle={handleStyle}
            onChange={this.handleRatingValue}
          />
        </div>
        <div className="slider-container">
          <div className="slider-text">
            <h1>Release</h1>
            <h1 className="numbers">{`${releaseDates[0]} - ${
              releaseDates[1]
            }`}</h1>
          </div>
          <h2>Find a movie within a certain era</h2>
          <Range
            allowCross={false}
            min={1900}
            max={this.currentYear}
            defaultValue={releaseDates}
            trackStyle={trackStyle}
            railStyle={railStyle}
            handleStyle={[handleStyle, handleStyle]}
            onChange={this.handleReleaseDateValue}
          />
        </div>
        <div className="select-container">
          <h1>Genre</h1>
          <h2>Select one or multiple genres</h2>
          <Select
            multi
            options={genreData}
            onChange={this.handleSelectChange}
            placeholder="Select"
            value={genre}
          />
        </div>
        <div className="select-container">
          <h1>Sort</h1>
          <h2>Return results with custom sorting</h2>
          <Select
            options={sortData}
            onChange={this.handleSortChange}
            placeholder="Select"
            value={sort}
            valueRenderer={this.renderValue}
          />
        </div>
        <div className="submit-container">
          <button
            className="cancel"
            onClick={() => {
              handleOptionsModal();
            }}
          >
            Cancel
          </button>
          <button className="submit" onClick={this.handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    );
  }
}

OptionsModal.propTypes = {
  handleOptionsModal: PropTypes.func.isRequired,
  handleQueryUpdate: PropTypes.func.isRequired
};

/*

        <button
          className={`movie${mediaType === 'movie' ? ' active' : ''}`}
          onClick={this.handleActiveTab}
        >
          Movies
        </button>
        <button
          className={`tv${mediaType === 'tv' ? ' active' : ''}`}
          onClick={this.handleActiveTab}
        >
          Shows
        </button>
*/

// OptionsModal.defaultProps = {
//   trailerLink: null
// };
