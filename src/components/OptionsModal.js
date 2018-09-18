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

    this.handleActiveMedia = this.handleActiveMedia.bind(this);
    this.handleRatingValue = this.handleRatingValue.bind(this);
    this.handleReleaseDateValue = this.handleReleaseDateValue.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleSortChange = this.handleSortChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderValue = this.renderValue.bind(this);
  }

  componentDidMount() {
    // hides scrollbar when mounted
    // disables background content from scrolling on ios safari
    Object.assign(document.body.style, {
      overflow: 'hidden',
      position: 'fixed',
      width: '100%'
    });
  }

  componentWillUnmount() {
    // restore defaults
    Object.assign(document.body.style, {
      overflow: 'visible',
      position: 'static',
      width: 'auto'
    });
  }

  handleActiveMedia(e) {
    // reset drop down selectors
    this.setState({
      mediaType: e.target.value,
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

  renderValue(option) {
    return <h1 style={{ color: '#828282' }}>{option.label}</h1>;
  }

  render() {
    const { mediaType, score, releaseDates, genre, sort } = this.state;
    const { handleOptionsModal, apiReady } = this.props;

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
    ];
    const railStyle = {
      backgroundColor: '#eee',
      height: 6
    };

    const handleStyle = {
      border: '5px solid #0f96ea',
      height: 24,
      width: 24,
      marginTop: -9,
      backgroundColor: '#fff',
      boxShadow: 'none'
    };

    return (
      <div className="test-options">
        <div className="options-modal">
          <div className="media-container">
            <h1>Media Type</h1>
            <h2>Find movies or series</h2>
            <ul>
              <li>
                <label
                  className={mediaType === 'movie' ? 'selected' : ''}
                  htmlFor="type-movie"
                >
                  <input
                    id="type-movie"
                    type="radio"
                    value="movie"
                    checked={mediaType === 'movie'}
                    onChange={this.handleActiveMedia}
                  />
                  <h1>Movies</h1>
                </label>
              </li>
              <li>
                <label
                  className={mediaType === 'tv' ? 'selected' : ''}
                  htmlFor="type-tv"
                >
                  <input
                    id="type-tv"
                    type="radio"
                    value="tv"
                    checked={mediaType === 'tv'}
                    onChange={this.handleActiveMedia}
                  />
                  <h1>Television</h1>
                </label>
              </li>
            </ul>
          </div>
          <div className="slider-container">
            <div className="slider-text">
              <h1>Rating</h1>
              <h2 className="numbers">{score}</h2>
            </div>
            <h2>Find media with a minimum rating</h2>
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
              <h2 className="numbers">{`${releaseDates[0]} - ${releaseDates[1]}`}</h2>
            </div>
            <h2>Find media within a certain era</h2>
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
          <div className="select-genre">
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
          <div className="select-sort">
            <h1>Sort</h1>
            <h2>Show results with custom sorting</h2>
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
              <h1>Cancel</h1>
            </button>
            <button
              disabled={!apiReady}
              className={`submit ${!apiReady && 'disabled'}`}
              onClick={this.handleSubmit}
            >
              <h1>Submit</h1>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

OptionsModal.propTypes = {
  handleOptionsModal: PropTypes.func.isRequired,
  handleQueryUpdate: PropTypes.func.isRequired,
  apiReady: PropTypes.bool.isRequired
};
