import React from 'react';
// import PropTypes from 'prop-types';
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';

export default class OptionsModal extends React.Component {
  constructor(props) {
    super(props);
    this.currentYear = new Date().getFullYear();
    this.state = {
      active: 'movie',
      rating: 60,
      releaseDates: [1942, this.currentYear]
    };

    this.handleActiveTab = this.handleActiveTab.bind(this);
    this.handleRatingValue = this.handleRatingValue.bind(this);
    this.handleReleaseDateValue = this.handleReleaseDateValue.bind(this);
  }

  handleActiveTab(e) {
    this.setState({
      active: e.target.className
    });
  }

  handleRatingValue(value) {
    this.setState({
      rating: value
    });
  }

  handleReleaseDateValue(value) {
    this.setState({
      releaseDates: value
    });
  }

  render() {
    const { active, rating, releaseDates } = this.state;

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
      </div>
    );
  }
}

// OptionsModal.propTypes = {
//   trailerLink: PropTypes.string
// };

// OptionsModal.defaultProps = {
//   trailerLink: null
// };
