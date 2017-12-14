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
      <h2 style={{ color: '#3f3f3f', fontSize: '12px' }}>
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
      page: 1,
      // genre: genre.length ? this.lsQuery.genre
      sort: sort === null ? this.lsQuery.sort : this.state.sort
    });

    handleQueryUpdate(newQuery);
    // console.log();
  }

  render() {
    const {
      mediaType,
      score,
      releaseDates,
      genre,
      sort
    } = this.state;
    const { handleOptionsModal } = this.props;

    // data for genre select
    const mediaGenres = mediaType === 'movie'
      ? data.moviesGenres
      : data.tvGenres;

    // data for sort by select
    const mediaSort = mediaType === 'movie'
      ? data.moviesSort
      : data.tvSort;

    const trackStyle = [{ backgroundColor: '#0f96ea' }]; // #0f96ea #007cd9
    const handleStyle = {
      border: '5px solid #0f96ea',
      height: 15,
      width: 15,
      marginTop: -5,
      backgroundColor: '#fff',
      boxShadow: 'none'
    };

    return (
      <div>
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
        <div className="slider-container">
          <div className="slider-text">
            <h2>Rating higher than</h2>
            <h2>{score}</h2>
          </div>
          <Slider
            min={0}
            max={10}
            defaultValue={score}
            trackStyle={trackStyle}
            handleStyle={handleStyle}
            onChange={this.handleRatingValue}
          />
        </div>
        <div className="slider-container">
          <div className="slider-text">
            <h2>Release date</h2>
            <h2>{`${releaseDates[0]} - ${releaseDates[1]}`}</h2>
          </div>
          <Range
            allowCross={false}
            min={1900}
            max={this.currentYear}
            defaultValue={releaseDates}
            trackStyle={trackStyle}
            handleStyle={[handleStyle, handleStyle]}
            onChange={this.handleReleaseDateValue}
          />
        </div>
        <div className="select-container">
          <Select
            multi
            options={mediaGenres}
            onChange={this.handleSelectChange}
            placeholder="Genres"
            value={genre}
          />
        </div>
        <div className="select-container">
          <Select
            options={mediaSort}
            onChange={this.handleSortChange}
            placeholder="Sort by"
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

// OptionsModal.defaultProps = {
//   trailerLink: null
// };
