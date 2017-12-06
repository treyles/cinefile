import React from 'react';
import PropTypes from 'prop-types';
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
// import { fetchGenres } from '../utils/Api';
import data from '../data/options.json';

export default class OptionsModal extends React.Component {
  constructor(props) {
    super(props);
    this.currentYear = new Date().getFullYear();
    this.state = {
      optionsData: data,
      active: 'movie',
      rating: 60,
      releaseDates: [1942, this.currentYear],
      genres: [],
      sort: ''
    };

    this.handleActiveTab = this.handleActiveTab.bind(this);
    this.handleRatingValue = this.handleRatingValue.bind(this);
    this.handleReleaseDateValue = this.handleReleaseDateValue.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleSortChange = this.handleSortChange.bind(this);
    this.renderValue = this.renderValue.bind(this);
  }

  // componentDidMount() {
  //   fetchGenres().then(response => response);
  // }

  handleActiveTab(e) {
    this.setState({
      active: e.target.className,
      genres: [],
      sort: ''
    });
  }

  handleRatingValue(value) {
    this.setState({ rating: value });
  }

  handleReleaseDateValue(value) {
    this.setState({ releaseDates: value });
  }

  handleSelectChange(value) {
    this.setState({ genres: value });
  }

  handleSortChange(value) {
    this.setState({ sort: value });
  }

  renderValue(option) {
    return (
      <h2 style={{ color: '#828282', fontSize: '12px' }}>
        {option.label}
      </h2>
    );
  }

  render() {
    const {
      active,
      rating,
      releaseDates,
      genres,
      optionsData,
      sort
    } = this.state;
    const { handleOptionsModal } = this.props;

    const mediaGenres = active === 'movie'
      ? optionsData.moviesGenres
      : optionsData.tvGenres;

    const mediaSort = active === 'movie'
      ? optionsData.moviesSort
      : optionsData.tvSort;

    const trackStyle = [{ backgroundColor: '#007cd9' }];
    const handleStyle = {
      border: '5px solid #007cd9',
      height: 15,
      width: 15,
      marginTop: -6,
      backgroundColor: '#fff',
      boxShadow: 'none'
    };

    return (
      <div>
        <button
          className={`movie${active === 'movie' ? ' active' : ''}`}
          onClick={this.handleActiveTab}
        >
          Movies
        </button>
        <button
          className={`tv${active === 'tv' ? ' active' : ''}`}
          onClick={this.handleActiveTab}
        >
          Television
        </button>
        <div className="slider-container">
          <div className="slider-text">
            <h2>Rating higher than</h2>
            <h2>{rating}</h2>
          </div>
          <Slider
            min={0}
            max={100}
            defaultValue={60}
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
            defaultValue={[1942, this.currentYear]}
            trackStyle={trackStyle}
            handleStyle={[handleStyle, handleStyle]}
            onChange={this.handleReleaseDateValue}
          />
        </div>
        <div className="select-container">
          <div className="select-text">
            <h2>Genres</h2>
          </div>
          <Select
            multi
            options={mediaGenres}
            onChange={this.handleSelectChange}
            placeholder="Select"
            value={genres}
          />
        </div>
        <div className="select-container">
          <div className="select-text">
            <h2>Sort by</h2>
          </div>
          <Select
            options={mediaSort}
            onChange={this.handleSortChange}
            placeholder="Select"
            value={sort}
            style={{ color: 'green' }}
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
          <button className="submit">
            Submit
          </button>
        </div>
      </div>
    );
  }
}

OptionsModal.propTypes = {
  handleOptionsModal: PropTypes.func.isRequired
};

// OptionsModal.defaultProps = {
//   trailerLink: null
// };
