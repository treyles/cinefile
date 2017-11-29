import React from 'react';
import PropTypes from 'prop-types';

export default class Icon extends React.Component {
  render() {
    const { width, height, color } = this.props;

    const svg = {
      trash: () => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={width}
          height={height}
          viewBox="0 0 92 92"
          pointerEvents="none"
          fill={color}
        >
          <path d="M78.4,30.4l-3.1,57.8c-0.1,2.1-1.9,3.8-4,3.8H20.7c-2.1,0-3.9-1.7-4-3.8l-3.1-57.8
  c-0.1-2.2,1.6-4.1,3.8-4.2c2.2-0.1,4.1,1.6,4.2,3.8l2.9,54h43.1l2.9-54c0.1-2.2,2-3.9,4.2-3.8C76.8,26.3,78.5,28.2,78.4,30.4z
   M89,17c0,2.2-1.8,4-4,4H7c-2.2,0-4-1.8-4-4s1.8-4,4-4h22V4c0-1.9,1.3-3,3.2-3h27.6C61.7,1,63,2.1,63,4v9h22C87.2,13,89,14.8,89,17z
   M36,13h20V8H36V13z M37.7,78C37.7,78,37.7,78,37.7,78c2,0,3.5-1.9,3.5-3.8l-1-43.2c0-1.9-1.6-3.5-3.6-3.5c-1.9,0-3.5,1.6-3.4,3.6
  l1,43.3C34.2,76.3,35.8,78,37.7,78z M54.2,78c1.9,0,3.5-1.6,3.5-3.5l1-43.2c0-1.9-1.5-3.6-3.4-3.6c-2,0-3.5,1.5-3.6,3.4l-1,43.2
  C50.6,76.3,52.2,78,54.2,78C54.1,78,54.1,78,54.2,78z" />
        </svg>
      ),

      text: () => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={width}
          height={height}
          viewBox="0 0 92 92"
          pointerEvents="none"
          fill={color}
        >
          <path d="M76,2H16c-2.2,0-4,1.8-4,4v80c0,2.2,1.8,4,4,4h60c2.2,0,4-1.8,4-4V6C80,3.8,78.2,2,76,2z M72,82H20V10h52
  V82z M29.5,55.5c0-1.9,1.6-3.5,3.5-3.5h11.8c1.9,0,3.5,1.6,3.5,3.5S46.7,59,44.8,59H33C31,59,29.5,57.4,29.5,55.5z M30,39.5
  c0-1.9,1.6-3.5,3.5-3.5h23.8c1.9,0,3.5,1.6,3.5,3.5S59.3,43,57.3,43H33.5C31.6,43,30,41.4,30,39.5z M30,24.5c0-1.9,1.6-3.5,3.5-3.5
  h23.8c1.9,0,3.5,1.6,3.5,3.5S59.3,28,57.3,28H33.5C31.6,28,30,26.4,30,24.5z M59.7,53.3c0.6,0.6,1,1.5,1,2.5c0,0.9-0.4,1.8-1,2.5
  s-1.6,1-2.5,1s-1.8-0.4-2.5-1c-0.7-0.6-1-1.5-1-2.5c0-0.9,0.4-1.8,1-2.5C56,52,58.4,52,59.7,53.3z" />
        </svg>
      ),

      document: () => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={width}
          height={height}
          viewBox="0 0 92 92"
          pointerEvents="none"
          fill={color}
        >
          <path d="M46,21.9c-0.7-0.7-1.6-0.9-2.5-0.9H13.6c-2,0-4.6,1.2-4.6,3.1v63.3c0,2,2.6,4.5,4.6,4.5H61
  c2,0,3-2.6,3-4.5V41.8c0-0.9-0.1-1.7-0.8-2.4L46,21.9z M55.9,42H43V29.1L55.9,42z M17,84V28h19v17.2c0,2,1.8,3.8,3.8,3.8H57v35H17z
   M82.4,18L65,0.6C64.4,0.1,63.8,0,63,0H33.1C31.4,0,30,0.9,30,2.5v9.6c0,1.7,1.3,3,3,3c1.7,0,3-1.4,3-3V6h21v16.9
  c0,1.7,1.4,3.1,3.1,3.1H77v37h-4.1c-1.7,0-3,1.3-3,3s1.4,3,3,3h7.6c1.7,0,2.5-1.5,2.5-3.2V20.2C83,19.4,82.9,18.6,82.4,18z M63,7
  l12.9,13H63V7z" />
        </svg>
      ),

      trailer: () => (
        <svg
          width={width}
          height={height}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 92 92"
          pointerEvents="none"
          fill={color}
        >
          <path d="M84.4,7H7.6C3.4,7,0,10.4,0,14.6v44.3C0,63.1,3.4,67,7.6,67H33v4.1l-7.6,6.1C24,78.3,23.4,80.4,24,82
  c0.6,1.6,2.1,3,3.8,3h36c1.7,0,3.3-1.4,3.9-3c0.6-1.6,0.1-3.6-1.2-4.7L59,71.1V67h25.4c4.2,0,7.6-3.9,7.6-8.1V14.6
  C92,10.4,88.6,7,84.4,7z M53.2,75.8l2.4,2.2H36l2.6-2.3c0.8-0.7,1.4-1.9,1.4-3V67h12v5.8C52,73.8,52.4,75.1,53.2,75.8z M84,59H8V15
  h76V59z" />
        </svg>
      ),

      eye: () => (
        <svg
          width={width}
          height={height}
          viewBox="0 0 24 24"
          stroke={color}
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          pointerEvents="none"
        >
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      )
    };

    return svg[this.props.icon]();
  }
}

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired
};
