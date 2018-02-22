import React from 'react';
import PropTypes from 'prop-types';

// TODO: remove width and height, being set in CSS  //////
// has been set in css (for mobile), but desktop needs to be explicitly set
// after removing width/height below

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
          // fill={color}
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
          // fill={color}
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
          // fill={color}
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
          // fill={color}
        >
          <path d="M84.4,7H7.6C3.4,7,0,10.4,0,14.6v44.3C0,63.1,3.4,67,7.6,67H33v4.1l-7.6,6.1C24,78.3,23.4,80.4,24,82
  c0.6,1.6,2.1,3,3.8,3h36c1.7,0,3.3-1.4,3.9-3c0.6-1.6,0.1-3.6-1.2-4.7L59,71.1V67h25.4c4.2,0,7.6-3.9,7.6-8.1V14.6
  C92,10.4,88.6,7,84.4,7z M53.2,75.8l2.4,2.2H36l2.6-2.3c0.8-0.7,1.4-1.9,1.4-3V67h12v5.8C52,73.8,52.4,75.1,53.2,75.8z M84,59H8V15
  h76V59z" />
        </svg>
      ),

      menu: () => (
        <svg
          width={width}
          height={height}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 92 92"
          pointerEvents="none"
        >
          <path
            id="XMLID_101_"
            d="M78,23.5H14c-3.6,0-6.5-2.9-6.5-6.5s2.9-6.5,6.5-6.5h64c3.6,0,6.5,2.9,6.5,6.5S81.6,23.5,78,23.5z M84.5,46
  c0-3.6-2.9-6.5-6.5-6.5H14c-3.6,0-6.5,2.9-6.5,6.5s2.9,6.5,6.5,6.5h64C81.6,52.5,84.5,49.6,84.5,46z M84.5,75c0-3.6-2.9-6.5-6.5-6.5
  H14c-3.6,0-6.5,2.9-6.5,6.5s2.9,6.5,6.5,6.5h64C81.6,81.5,84.5,78.6,84.5,75z"
          />
        </svg>
      ),

      menu2: () => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={width}
          height={height}
          viewBox="0 0 26 26"
          fill="none"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      ),

      preview: () => (
        <svg
          width={width}
          height={height}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 92 92"
          pointerEvents="none"
        >
          <path
            id="XMLID_1239_"
            d="M91.3,43.8C90.6,42.8,74.4,19,46,19C17.6,19,1.4,42.8,0.7,43.8c-0.9,1.3-0.9,3.1,0,4.5
  C1.4,49.2,17.6,73,46,73c28.4,0,44.6-23.8,45.3-24.8C92.2,46.9,92.2,45.1,91.3,43.8z M46,65C26.7,65,13.5,51.4,9,46
  c4.5-5.5,17.6-19,37-19c19.3,0,32.5,13.6,37,19C78.4,51.5,65.3,65,46,65z M48.3,29.6c-4.4-0.6-8.7,0.5-12.3,3.2c0,0,0,0,0,0
  c-7.3,5.5-8.8,15.9-3.3,23.2c2.7,3.6,6.5,5.8,10.9,6.5c0.8,0.1,1.6,0.2,2.3,0.2c3.6,0,7-1.2,9.9-3.3c7.3-5.5,8.8-15.9,3.3-23.2
  C56.6,32.5,52.7,30.2,48.3,29.6z M52.3,54.5c-2.2,1.7-5,2.4-7.8,2c-2.8-0.4-5.3-1.9-7-4.1C34.1,47.7,35,41,39.7,37.5
  c2.2-1.7,5-2.4,7.8-2c2.8,0.4,5.3,1.9,7,4.1C57.9,44.3,57,51,52.3,54.5z M51.9,40c0.8,0.7,1.2,1.8,1.2,2.8c0,1-0.4,2.1-1.2,2.8
  c-0.7,0.7-1.8,1.2-2.8,1.2c-1.1,0-2.1-0.4-2.8-1.2c-0.8-0.8-1.2-1.8-1.2-2.8c0-1.1,0.4-2.1,1.2-2.8c0.7-0.8,1.8-1.2,2.8-1.2
  C50.2,38.9,51.2,39.3,51.9,40z"
          />
        </svg>
      ),

      archive: () => (
        <svg
          width={width}
          height={height}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 92 92"
          pointerEvents="none"
        >
          <path
            id="XMLID_1478_"
            d="M15.7,22c0-2.2,1.8-4,4-4h52.5c2.2,0,4,1.8,4,4s-1.8,4-4,4H19.7C17.5,26,15.7,24.2,15.7,22z M26.3,12h39.4
  c1.9,0,3.5-1.6,3.5-3.5S67.6,5,65.7,5H26.3c-1.9,0-3.5,1.6-3.5,3.5S24.4,12,26.3,12z M92,26.6v10.9c0,0,0,0,0,0c0,0,0,0,0,0
  c0,0,0,0,0,0c0,0,0,0,0,0c0,0.4-0.1,0.8-0.2,1.1L79,85.1C78.5,86.8,77,88,75.2,88H16.6c-1.8,0-3.4-1.2-3.9-3L0.2,38.6
  C0.1,38.4,0.1,38.2,0,38c0-0.2,0-0.4,0-0.6V26.6c0-2.2,1.8-4,4-4s4,1.8,4,4V34h76v-7.4c0-2.2,1.8-4,4-4S92,24.4,92,26.6z M82.7,42
  H9.2l10.4,38H46h26.1L82.7,42z M34.2,62h23.6c2.2,0,4-1.8,4-4s-1.8-4-4-4H34.2c-2.2,0-4,1.8-4,4S32,62,34.2,62z"
          />
        </svg>
      ),

      search: () => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={width}
          height={height}
          viewBox="0 0 22.21 23.04"
        >
          <circle
            cx="9.66"
            cy="9.66"
            r="8.66"
            fill="none"
            // stroke="#000"
            strokeMiterlimit="10"
            strokeWidth="2"
          />
          <line
            x1="15.38"
            y1="16.22"
            x2="21.5"
            y2="22.34"
            fill="none"
            // stroke="#000"
            strokeMiterlimit="10"
            strokeWidth="2"
          />
        </svg>
      ),

      plus: () => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={width}
          height={height}
          viewBox="0 0 24 24"
        >
          <path d="M10.56,0h2.88V10.56H24v2.88H13.44V24H10.56V13.44H0V10.56H10.56V0Z" />
        </svg>
      ),

      warning: () => (
        <svg
          width={width}
          height={height}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 92 92"
          pointerEvents="none"
        >
          <path
            id="XMLID_85_"
            d="M88,87H4c-1.4,0-2.7-0.8-3.5-2c-0.7-1.2-0.7-2.7,0-4l42-74c0.7-1.3,2-2,3.5-2s2.8,0.8,3.5,2l42,74
  c0.7,1.2,0.7,2.8,0,4C90.7,86.2,89.4,87,88,87z M10.9,79h70.3L46,17.1L10.9,79z M50,55.1V36.5c0-2.2-1.8-4-4-4s-4,1.8-4,4v18.6
c0,2.2,1.8,4,4,4S50,57.3,50,55.1z M49.5,71.7c0.9-0.9,1.5-2.2,1.5-3.5c0-1.3-0.5-2.6-1.5-3.5c-0.9-0.9-2.2-1.5-3.5-1.5
  c-1.3,0-2.6,0.5-3.5,1.5c-0.9,0.9-1.5,2.2-1.5,3.5c0,1.3,0.5,2.6,1.5,3.5c0.9,0.9,2.2,1.5,3.5,1.5C47.3,73.2,48.6,72.6,49.5,71.7z"
          />
        </svg>
      ),

      empty: () => (
        <svg
          className="empty"
          xmlns="http://www.w3.org/2000/svg"
          width={width}
          height={height}
          // width="228.89"
          // height="198.84"
          viewBox="0 0 228.89 198.84"
        >
          <rect
            x="48.96"
            y="38.31"
            width="156"
            height="17.67"
            rx="2"
            ry="2"
            fill="#c3dffa"
          />
          <line
            x1="45.05"
            y1="139.82"
            x2="45.05"
            y2="122.49"
            fill="none"
            stroke="#5e6c77"
            strokeMiterlimit="10"
            strokeWidth="2"
          />
          <path
            d="M201,154.07v11.25a3,3,0,0,1-3,3H48a3,3,0,0,1-3-3v-25.5"
            fill="none"
            stroke="#5e6c77"
            strokeMiterlimit="10"
            strokeWidth="2"
          />
          <line
            x1="201.05"
            y1="118.32"
            x2="201.05"
            y2="148.84"
            fill="none"
            stroke="#5e6c77"
            strokeMiterlimit="10"
            strokeWidth="2"
          />
          <line
            x1="201.05"
            y1="107.32"
            x2="201.05"
            y2="119.32"
            fill="none"
            stroke="#5e6c77"
            strokeMiterlimit="10"
            strokeWidth="2"
          />
          <path
            d="M80.8,34.32H198a3,3,0,0,1,3,3v70"
            fill="none"
            stroke="#5e6c77"
            strokeMiterlimit="10"
            strokeWidth="2"
          />
          <line
            x1="60.3"
            y1="34.32"
            x2="77.9"
            y2="34.32"
            fill="none"
            stroke="#5e6c77"
            strokeMiterlimit="10"
            strokeWidth="2"
          />
          <path
            d="M45,122.49V37.32a3,3,0,0,1,3-3H56.9"
            fill="none"
            stroke="#5e6c77"
            strokeMiterlimit="10"
            strokeWidth="2"
          />
          <line
            x1="45.05"
            y1="51.99"
            x2="201.05"
            y2="51.99"
            fill="none"
            stroke="#5e6c77"
            strokeMiterlimit="10"
            strokeWidth="2"
          />
          <line
            x1="102.71"
            y1="42.9"
            x2="189.38"
            y2="42.9"
            fill="none"
            stroke="#5e6c77"
            strokeMiterlimit="10"
            strokeWidth="2"
          />
          <circle
            cx="54.14"
            cy="42.9"
            r="2.76"
            fill="none"
            stroke="#5e6c77"
            strokeMiterlimit="10"
            strokeWidth="2"
          />
          <circle
            cx="64.89"
            cy="42.9"
            r="2.76"
            fill="none"
            stroke="#5e6c77"
            strokeMiterlimit="10"
            strokeWidth="2"
          />
          <circle
            cx="75.14"
            cy="42.9"
            r="2.76"
            fill="none"
            stroke="#5e6c77"
            strokeMiterlimit="10"
            strokeWidth="2"
          />
          <rect
            x="8.72"
            y="64.23"
            width="44.9"
            height="44.9"
            rx="3"
            ry="3"
            fill="#1b9eef"
          />
          <rect
            x="5.24"
            y="61.01"
            width="44.9"
            height="44.9"
            rx="3"
            ry="3"
            fill="none"
            stroke="#5e6c77"
            strokeMiterlimit="10"
            strokeWidth="2"
          />
          <path
            d="M30.06,67.9V81.46h13v3.46h-13V98.6H26.37V84.92h-13V81.46h13V67.9h3.69Z"
            fill="#f4f4f4"
          />
          <path
            d="M89.1,23.14a5.24,5.24,0,1,1,5.24-5.24A5.25,5.25,0,0,1,89.1,23.14Zm0-8.17A2.93,2.93,0,1,0,92,17.9,2.94,2.94,0,0,0,89.1,15Z"
            fill="#d6d6d6"
          />
          <path
            d="M16.87,33.52a0.94,0.94,0,0,1-.94-0.94c0-2-2.7-4.74-4.74-4.74a0.94,0.94,0,0,1,0-1.88c2,0,4.74-2.7,4.74-4.74a0.94,0.94,0,1,1,1.88,0c0,2,2.7,4.74,4.74,4.74a0.94,0.94,0,0,1,0,1.88c-2,0-4.74,2.7-4.74,4.74A0.94,0.94,0,0,1,16.87,33.52ZM14.13,26.9a8.63,8.63,0,0,1,2.73,2.73A8.63,8.63,0,0,1,19.6,26.9a8.63,8.63,0,0,1-2.73-2.73A8.63,8.63,0,0,1,14.13,26.9Z"
            fill="#d6d6d6"
          />
          <path
            d="M137.83,8.64a1.05,1.05,0,0,1-.75-0.31l-6.53-6.53a1.06,1.06,0,0,1,1.5-1.5l6.53,6.53A1.06,1.06,0,0,1,137.83,8.64Z"
            fill="#d6d6d6"
          />
          <path
            d="M131.31,8.64a1.06,1.06,0,0,1-.75-1.81l6.53-6.53a1.06,1.06,0,0,1,1.5,1.5l-6.53,6.53A1.05,1.05,0,0,1,131.31,8.64Z"
            fill="#d6d6d6"
          />
          <path
            d="M227.83,101.64a1.05,1.05,0,0,1-.75-0.31l-6.53-6.53a1.06,1.06,0,0,1,1.5-1.5l6.53,6.53A1.06,1.06,0,0,1,227.83,101.64Z"
            fill="#d6d6d6"
          />
          <path
            d="M221.31,101.64a1.06,1.06,0,0,1-.75-1.81l6.53-6.53a1.06,1.06,0,1,1,1.5,1.5l-6.53,6.53A1.05,1.05,0,0,1,221.31,101.64Z"
            fill="#d6d6d6"
          />
          <path
            d="M214.87,34.52a0.94,0.94,0,0,1-.94-0.94c0-2-2.7-4.74-4.74-4.74a0.94,0.94,0,0,1,0-1.88c2,0,4.74-2.7,4.74-4.74a0.94,0.94,0,1,1,1.88,0c0,2,2.7,4.74,4.74,4.74a0.94,0.94,0,0,1,0,1.88c-2,0-4.74,2.7-4.74,4.74A0.94,0.94,0,0,1,214.87,34.52Zm-2.73-6.62a8.63,8.63,0,0,1,2.73,2.73,8.63,8.63,0,0,1,2.73-2.73,8.63,8.63,0,0,1-2.73-2.73A8.63,8.63,0,0,1,212.13,27.9Z"
            fill="#d6d6d6"
          />
          <path
            d="M5.24,130.2A5.24,5.24,0,1,1,10.48,125,5.25,5.25,0,0,1,5.24,130.2Zm0-8.17A2.93,2.93,0,1,0,8.17,125,2.94,2.94,0,0,0,5.24,122Z"
            fill="#d6d6d6"
          />
          <ellipse cx="121.8" cy="193.92" rx="79.25" ry="4.92" fill="#e2e2e2" />
          <rect
            x="65.09"
            y="65.47"
            width="33.07"
            height="45.22"
            rx="3"
            ry="3"
            fill="#ddd"
          />
          <rect
            x="108.23"
            y="65.47"
            width="33.07"
            height="45.22"
            rx="3"
            ry="3"
            fill="#ddd"
          />
          <rect
            x="61.12"
            y="61.56"
            width="33.07"
            height="45.22"
            rx="3"
            ry="3"
            fill="none"
            stroke="#5e6c77"
            strokeMiterlimit="10"
            strokeWidth="2"
          />
          <line
            x1="63.52"
            y1="119.08"
            x2="89.75"
            y2="119.08"
            fill="none"
            stroke="#5e6c77"
            strokeMiterlimit="10"
            strokeWidth="2"
          />
          <line
            x1="63.52"
            y1="124.57"
            x2="80.8"
            y2="124.57"
            fill="none"
            stroke="#5e6c77"
            strokeMiterlimit="10"
            strokeWidth="2"
          />
          <rect
            x="104.26"
            y="61.56"
            width="33.07"
            height="45.22"
            rx="3"
            ry="3"
            fill="none"
            stroke="#5e6c77"
            strokeMiterlimit="10"
            strokeWidth="2"
          />
          <line
            x1="106.66"
            y1="119.08"
            x2="132.89"
            y2="119.08"
            fill="none"
            stroke="#5e6c77"
            strokeMiterlimit="10"
            strokeWidth="2"
          />
          <polyline
            points="19.33 126.96 27.88 118.42 36.43 126.96"
            fill="none"
            stroke="#5e6c77"
            strokeMiterlimit="10"
            strokeWidth="2"
          />
          <line
            x1="27.88"
            y1="118.89"
            x2="27.88"
            y2="141.34"
            fill="none"
            stroke="#5e6c77"
            strokeMiterlimit="10"
            strokeWidth="2"
          />
          <line
            x1="106.66"
            y1="124.57"
            x2="123.94"
            y2="124.57"
            fill="none"
            stroke="#5e6c77"
            strokeMiterlimit="10"
            strokeWidth="2"
          />
        </svg>
      ),

      emptyMobile: () => (
        <svg
          className="empty-mobile"
          xmlns="http://www.w3.org/2000/svg"
          width={width}
          height={height}
          // width="137.64"
          // height="194.13"
          viewBox="0 0 137.64 194.13"
        >
          <path
            d="M58.36,171.89V147.64a3,3,0,0,1,3-3H88.44a3,3,0,0,1,3,3v23.91"
            fill="#ddd"
          />
          <rect
            x="35.26"
            y="38.84"
            width="83.19"
            height="17.67"
            rx="2"
            ry="2"
            fill="#c3dffa"
          />
          <line
            x1="31.8"
            y1="138.86"
            x2="31.8"
            y2="121.69"
            fill="none"
            stroke="#5e6c77"
            strokeMiterlimit="10"
            strokeWidth="2"
          />
          <path
            d="M113.23,153v11.15c0,1.64-.7,3-1.57,3H33.37c-0.86,0-1.57-1.34-1.57-3V138.86"
            fill="none"
            stroke="#5e6c77"
            strokeMiterlimit="10"
            strokeWidth="2"
          />
          <line
            x1="113.23"
            y1="117.56"
            x2="113.23"
            y2="147.8"
            fill="none"
            stroke="#5e6c77"
            strokeMiterlimit="10"
            strokeWidth="2"
          />
          <line
            x1="113.23"
            y1="106.66"
            x2="113.23"
            y2="118.55"
            fill="none"
            stroke="#5e6c77"
            strokeMiterlimit="10"
            strokeWidth="2"
          />
          <path
            d="M50.46,34.32h61.21c0.86,0,1.57,1.34,1.57,3v69.36"
            fill="none"
            stroke="#5e6c77"
            strokeMiterlimit="10"
            strokeWidth="2"
          />
          <line
            x1="40.9"
            y1="34.32"
            x2="47.95"
            y2="34.32"
            fill="none"
            stroke="#5e6c77"
            strokeMiterlimit="10"
            strokeWidth="2"
          />
          <path
            d="M31.8,121.69V37.29c0-1.64.7-3,1.57-3H38"
            fill="none"
            stroke="#5e6c77"
            strokeMiterlimit="10"
            strokeWidth="2"
          />
          <line
            x1="31.8"
            y1="51.83"
            x2="113.23"
            y2="51.83"
            fill="none"
            stroke="#5e6c77"
            strokeMiterlimit="10"
            strokeWidth="2"
          />
          <line
            x1="56.23"
            y1="42.9"
            x2="70.07"
            y2="42.9"
            fill="none"
            stroke="#5e6c77"
            strokeMiterlimit="10"
            strokeWidth="2"
          />
          <circle
            cx="40.89"
            cy="42.9"
            r="2.76"
            fill="none"
            stroke="#5e6c77"
            strokeMiterlimit="10"
            strokeWidth="2"
          />
          <circle
            cx="104.55"
            cy="42.9"
            r="2.76"
            fill="none"
            stroke="#5e6c77"
            strokeMiterlimit="10"
            strokeWidth="2"
          />
          <path
            d="M35.85,23.14a5.24,5.24,0,1,1,5.24-5.24A5.25,5.25,0,0,1,35.85,23.14Zm0-8.17a2.93,2.93,0,1,0,2.93,2.93A2.94,2.94,0,0,0,35.85,15Z"
            fill="#d6d6d6"
          />
          <path
            d="M6.62,33.52a0.94,0.94,0,0,1-.94-0.94c0-2-2.7-4.74-4.74-4.74A0.94,0.94,0,0,1,.94,26c2,0,4.74-2.7,4.74-4.74a0.94,0.94,0,1,1,1.88,0c0,2,2.7,4.74,4.74,4.74a0.94,0.94,0,0,1,0,1.88c-2,0-4.74,2.7-4.74,4.74A0.94,0.94,0,0,1,6.62,33.52ZM3.89,26.9a8.63,8.63,0,0,1,2.73,2.73A8.63,8.63,0,0,1,9.36,26.9a8.63,8.63,0,0,1-2.73-2.73A8.63,8.63,0,0,1,3.89,26.9Z"
            fill="#d6d6d6"
          />
          <path
            d="M84.59,8.64a1.05,1.05,0,0,1-.75-0.31L77.31,1.81a1.06,1.06,0,0,1,1.5-1.5l6.53,6.53A1.06,1.06,0,0,1,84.59,8.64Z"
            fill="#d6d6d6"
          />
          <path
            d="M78.06,8.64a1.06,1.06,0,0,1-.75-1.81l6.53-6.53a1.06,1.06,0,0,1,1.5,1.5L78.81,8.33A1.05,1.05,0,0,1,78.06,8.64Z"
            fill="#d6d6d6"
          />
          <path
            d="M136.59,101.64a1.05,1.05,0,0,1-.75-0.31l-6.53-6.53a1.06,1.06,0,0,1,1.5-1.5l6.53,6.53A1.06,1.06,0,0,1,136.59,101.64Z"
            fill="#d6d6d6"
          />
          <path
            d="M130.06,101.64a1.06,1.06,0,0,1-.75-1.81l6.53-6.53a1.06,1.06,0,1,1,1.5,1.5l-6.53,6.53A1.05,1.05,0,0,1,130.06,101.64Z"
            fill="#d6d6d6"
          />
          <path
            d="M124.62,34.52a0.94,0.94,0,0,1-.94-0.94c0-2-2.7-4.74-4.74-4.74a0.94,0.94,0,0,1,0-1.88c2,0,4.74-2.7,4.74-4.74a0.94,0.94,0,1,1,1.88,0c0,2,2.7,4.74,4.74,4.74a0.94,0.94,0,0,1,0,1.88c-2,0-4.74,2.7-4.74,4.74A0.94,0.94,0,0,1,124.62,34.52Zm-2.73-6.62a8.63,8.63,0,0,1,2.73,2.73,8.63,8.63,0,0,1,2.73-2.73,8.63,8.63,0,0,1-2.73-2.73A8.63,8.63,0,0,1,121.89,27.9Z"
            fill="#d6d6d6"
          />
          <path
            d="M11,90.2A5.24,5.24,0,1,1,16.23,85,5.25,5.25,0,0,1,11,90.2ZM11,82A2.93,2.93,0,1,0,13.93,85,2.94,2.94,0,0,0,11,82Z"
            fill="#d6d6d6"
          />
          <ellipse cx="72.92" cy="189.2" rx="39.62" ry="4.92" fill="#e2e2e2" />
          <line
            x1="74.86"
            y1="42.9"
            x2="88.71"
            y2="42.9"
            fill="none"
            stroke="#5e6c77"
            strokeMiterlimit="10"
            strokeWidth="2"
          />
          <path
            d="M54.4,167.25V143.73a3,3,0,0,1,3-3H84.47a3,3,0,0,1,3,3v23.52"
            fill="none"
            stroke="#5e6c77"
            strokeMiterlimit="10"
            strokeWidth="2"
          />
          <rect
            x="57.96"
            y="67.75"
            width="33.07"
            height="45.22"
            rx="3"
            ry="3"
            fill="#ddd"
          />
          <rect
            x="54"
            y="63.84"
            width="33.07"
            height="45.22"
            rx="3"
            ry="3"
            fill="none"
            stroke="#5e6c77"
            strokeMiterlimit="10"
            strokeWidth="2"
          />
          <line
            x1="56.39"
            y1="121.36"
            x2="82.63"
            y2="121.36"
            fill="none"
            stroke="#5e6c77"
            strokeMiterlimit="10"
            strokeWidth="2"
          />
          <line
            x1="56.39"
            y1="126.85"
            x2="73.67"
            y2="126.85"
            fill="none"
            stroke="#5e6c77"
            strokeMiterlimit="10"
            strokeWidth="2"
          />
          <polyline
            points="113.1 17.88 104.55 26.43 96 17.88"
            fill="none"
            stroke="#5e6c77"
            strokeMiterlimit="10"
            strokeWidth="2"
          />
          <line
            x1="104.55"
            y1="25.95"
            x2="104.55"
            y2="3.5"
            fill="none"
            stroke="#5e6c77"
            strokeMiterlimit="10"
            strokeWidth="2"
          />
        </svg>
      ),

      sad: () => (
        <svg
          className="sad"
          xmlns="http://www.w3.org/2000/svg"
          width={width}
          height={height}
          // width="218.33"
          // height="198.84"
          viewBox="0 0 218.33 198.84"
        >
          <path
            d="M117.16,100.25a1,1,0,0,1-.9-0.56,3.52,3.52,0,0,0-3.2-2.12,3.44,3.44,0,0,0-2.87,2,1,1,0,1,1-1.78-.92A5.41,5.41,0,0,1,113,95.57a5.48,5.48,0,0,1,5.07,3.24,1,1,0,0,1-.46,1.34A1,1,0,0,1,117.16,100.25Z"
            fill="#5e6c77"
          />
          <circle cx="97.48" cy="90.65" r="1.81" fill="#5e6c77" />
          <circle cx="129.19" cy="90.65" r="1.81" fill="#5e6c77" />
          <circle cx="97.94" cy="101.14" r="7.23" fill="#f2dde2" />
          <circle cx="128.99" cy="101.37" r="7.23" fill="#f2dde2" />
          <rect
            x="38.71"
            y="38.31"
            width="156"
            height="17.67"
            rx="2"
            ry="2"
            fill="#c3dffa"
          />
          <line
            x1="34.8"
            y1="139.82"
            x2="34.8"
            y2="122.49"
            fill="none"
            stroke="#5e6c77"
            strokeMiterlimit="10"
            strokeWidth="2"
          />
          <path
            d="M190.8,154.07v11.25a3,3,0,0,1-3,3H37.8a3,3,0,0,1-3-3v-25.5"
            fill="none"
            stroke="#5e6c77"
            strokeMiterlimit="10"
            strokeWidth="2"
          />
          <line
            x1="190.8"
            y1="118.32"
            x2="190.8"
            y2="148.84"
            fill="none"
            stroke="#5e6c77"
            strokeMiterlimit="10"
            strokeWidth="2"
          />
          <line
            x1="190.8"
            y1="107.32"
            x2="190.8"
            y2="119.32"
            fill="none"
            stroke="#5e6c77"
            strokeMiterlimit="10"
            strokeWidth="2"
          />
          <path
            d="M70.55,34.32H187.8a3,3,0,0,1,3,3v70"
            fill="none"
            stroke="#5e6c77"
            strokeMiterlimit="10"
            strokeWidth="2"
          />
          <line
            x1="50.05"
            y1="34.32"
            x2="67.65"
            y2="34.32"
            fill="none"
            stroke="#5e6c77"
            strokeMiterlimit="10"
            strokeWidth="2"
          />
          <path
            d="M34.8,122.49V37.32a3,3,0,0,1,3-3h8.85"
            fill="none"
            stroke="#5e6c77"
            strokeMiterlimit="10"
            strokeWidth="2"
          />
          <line
            x1="34.8"
            y1="51.99"
            x2="190.8"
            y2="51.99"
            fill="none"
            stroke="#5e6c77"
            strokeMiterlimit="10"
            strokeWidth="2"
          />
          <line
            x1="92.47"
            y1="42.9"
            x2="179.13"
            y2="42.9"
            fill="none"
            stroke="#5e6c77"
            strokeMiterlimit="10"
            strokeWidth="2"
          />
          <circle
            cx="43.89"
            cy="42.9"
            r="2.76"
            fill="none"
            stroke="#5e6c77"
            strokeMiterlimit="10"
            strokeWidth="2"
          />
          <circle
            cx="54.64"
            cy="42.9"
            r="2.76"
            fill="none"
            stroke="#5e6c77"
            strokeMiterlimit="10"
            strokeWidth="2"
          />
          <circle
            cx="64.89"
            cy="42.9"
            r="2.76"
            fill="none"
            stroke="#5e6c77"
            strokeMiterlimit="10"
            strokeWidth="2"
          />
          <path
            d="M78.85,23.14a5.24,5.24,0,1,1,5.24-5.24A5.25,5.25,0,0,1,78.85,23.14Zm0-8.17a2.93,2.93,0,1,0,2.93,2.93A2.94,2.94,0,0,0,78.85,15Z"
            fill="#d6d6d6"
          />
          <path
            d="M6.62,33.52a0.94,0.94,0,0,1-.94-0.94c0-2-2.7-4.74-4.74-4.74A0.94,0.94,0,0,1,.94,26c2,0,4.74-2.7,4.74-4.74a0.94,0.94,0,1,1,1.88,0c0,2,2.7,4.74,4.74,4.74a0.94,0.94,0,0,1,0,1.88c-2,0-4.74,2.7-4.74,4.74A0.94,0.94,0,0,1,6.62,33.52ZM3.89,26.9a8.63,8.63,0,0,1,2.73,2.73A8.63,8.63,0,0,1,9.36,26.9a8.63,8.63,0,0,1-2.73-2.73A8.63,8.63,0,0,1,3.89,26.9Z"
            fill="#d6d6d6"
          />
          <path
            d="M127.59,8.64a1.05,1.05,0,0,1-.75-0.31l-6.53-6.53a1.06,1.06,0,1,1,1.5-1.5l6.53,6.53A1.06,1.06,0,0,1,127.59,8.64Z"
            fill="#d6d6d6"
          />
          <path
            d="M121.06,8.64a1.06,1.06,0,0,1-.75-1.81l6.53-6.53a1.06,1.06,0,0,1,1.5,1.5l-6.53,6.53A1.05,1.05,0,0,1,121.06,8.64Z"
            fill="#d6d6d6"
          />
          <path
            d="M217.59,101.64a1.05,1.05,0,0,1-.75-0.31l-6.53-6.53a1.06,1.06,0,0,1,1.5-1.5l6.53,6.53A1.06,1.06,0,0,1,217.59,101.64Z"
            fill="#d6d6d6"
          />
          <path
            d="M211.06,101.64a1.06,1.06,0,0,1-.75-1.81l6.53-6.53a1.06,1.06,0,1,1,1.5,1.5l-6.53,6.53A1.05,1.05,0,0,1,211.06,101.64Z"
            fill="#d6d6d6"
          />
          <path
            d="M204.62,34.52a0.94,0.94,0,0,1-.94-0.94c0-2-2.7-4.74-4.74-4.74a0.94,0.94,0,0,1,0-1.88c2,0,4.74-2.7,4.74-4.74a0.94,0.94,0,1,1,1.88,0c0,2,2.7,4.74,4.74,4.74a0.94,0.94,0,0,1,0,1.88c-2,0-4.74,2.7-4.74,4.74A0.94,0.94,0,0,1,204.62,34.52Zm-2.73-6.62a8.63,8.63,0,0,1,2.73,2.73,8.63,8.63,0,0,1,2.73-2.73,8.63,8.63,0,0,1-2.73-2.73A8.63,8.63,0,0,1,201.89,27.9Z"
            fill="#d6d6d6"
          />
          <path
            d="M14,90.2A5.24,5.24,0,1,1,19.23,85,5.25,5.25,0,0,1,14,90.2ZM14,82A2.93,2.93,0,1,0,16.93,85,2.94,2.94,0,0,0,14,82Z"
            fill="#d6d6d6"
          />
          <ellipse
            cx="111.55"
            cy="193.92"
            rx="79.25"
            ry="4.92"
            fill="#e2e2e2"
          />
        </svg>
      ),

      sadMobile: () => (
        <svg
          className="sad-mobile"
          xmlns="http://www.w3.org/2000/svg"
          width={width}
          height={height}
          // width="137.33"
          // height="194.42"
          viewBox="0 0 137.33 194.42"
        >
          <rect
            x="35.26"
            y="38.84"
            width="83.19"
            height="17.67"
            rx="2"
            ry="2"
            fill="#c3dffa"
          />
          <line
            x1="31.8"
            y1="138.86"
            x2="31.8"
            y2="121.69"
            fill="none"
            stroke="#5e6c77"
            strokeMiterlimit="10"
            strokeWidth="2"
          />
          <path
            d="M113.23,153v11.15c0,1.64-.7,3-1.57,3H33.37c-0.86,0-1.57-1.34-1.57-3V138.86"
            fill="none"
            stroke="#5e6c77"
            strokeMiterlimit="10"
            strokeWidth="2"
          />
          <line
            x1="113.23"
            y1="117.56"
            x2="113.23"
            y2="147.8"
            fill="none"
            stroke="#5e6c77"
            strokeMiterlimit="10"
            strokeWidth="2"
          />
          <line
            x1="113.23"
            y1="106.66"
            x2="113.23"
            y2="118.55"
            fill="none"
            stroke="#5e6c77"
            strokeMiterlimit="10"
            strokeWidth="2"
          />
          <path
            d="M50.46,34.32h61.21c0.86,0,1.57,1.34,1.57,3v69.36"
            fill="none"
            stroke="#5e6c77"
            strokeMiterlimit="10"
            strokeWidth="2"
          />
          <line
            x1="40.9"
            y1="34.32"
            x2="47.95"
            y2="34.32"
            fill="none"
            stroke="#5e6c77"
            strokeMiterlimit="10"
            strokeWidth="2"
          />
          <path
            d="M31.8,121.69V37.29c0-1.64.7-3,1.57-3H38"
            fill="none"
            stroke="#5e6c77"
            strokeMiterlimit="10"
            strokeWidth="2"
          />
          <line
            x1="31.8"
            y1="51.83"
            x2="113.23"
            y2="51.83"
            fill="none"
            stroke="#5e6c77"
            strokeMiterlimit="10"
            strokeWidth="2"
          />
          <line
            x1="56.23"
            y1="42.9"
            x2="70.07"
            y2="42.9"
            fill="none"
            stroke="#5e6c77"
            strokeMiterlimit="10"
            strokeWidth="2"
          />
          <circle
            cx="40.89"
            cy="42.9"
            r="2.76"
            fill="none"
            stroke="#5e6c77"
            strokeMiterlimit="10"
            strokeWidth="2"
          />
          <circle
            cx="104.55"
            cy="42.9"
            r="2.76"
            fill="none"
            stroke="#5e6c77"
            strokeMiterlimit="10"
            strokeWidth="2"
          />
          <path
            d="M35.85,23.14a5.24,5.24,0,1,1,5.24-5.24A5.25,5.25,0,0,1,35.85,23.14Zm0-8.17a2.93,2.93,0,1,0,2.93,2.93A2.94,2.94,0,0,0,35.85,15Z"
            fill="#d6d6d6"
          />
          <path
            d="M6.62,33.52a0.94,0.94,0,0,1-.94-0.94c0-2-2.7-4.74-4.74-4.74A0.94,0.94,0,0,1,.94,26c2,0,4.74-2.7,4.74-4.74a0.94,0.94,0,1,1,1.88,0c0,2,2.7,4.74,4.74,4.74a0.94,0.94,0,0,1,0,1.88c-2,0-4.74,2.7-4.74,4.74A0.94,0.94,0,0,1,6.62,33.52ZM3.89,26.9a8.63,8.63,0,0,1,2.73,2.73A8.63,8.63,0,0,1,9.36,26.9a8.63,8.63,0,0,1-2.73-2.73A8.63,8.63,0,0,1,3.89,26.9Z"
            fill="#d6d6d6"
          />
          <path
            d="M84.59,8.64a1.05,1.05,0,0,1-.75-0.31L77.31,1.81a1.06,1.06,0,0,1,1.5-1.5l6.53,6.53A1.06,1.06,0,0,1,84.59,8.64Z"
            fill="#d6d6d6"
          />
          <path
            d="M78.06,8.64a1.06,1.06,0,0,1-.75-1.81l6.53-6.53a1.06,1.06,0,0,1,1.5,1.5L78.81,8.33A1.05,1.05,0,0,1,78.06,8.64Z"
            fill="#d6d6d6"
          />
          <path
            d="M136.59,101.64a1.05,1.05,0,0,1-.75-0.31l-6.53-6.53a1.06,1.06,0,0,1,1.5-1.5l6.53,6.53A1.06,1.06,0,0,1,136.59,101.64Z"
            fill="#d6d6d6"
          />
          <path
            d="M130.06,101.64a1.06,1.06,0,0,1-.75-1.81l6.53-6.53a1.06,1.06,0,1,1,1.5,1.5l-6.53,6.53A1.05,1.05,0,0,1,130.06,101.64Z"
            fill="#d6d6d6"
          />
          <path
            d="M124.62,34.52a0.94,0.94,0,0,1-.94-0.94c0-2-2.7-4.74-4.74-4.74a0.94,0.94,0,0,1,0-1.88c2,0,4.74-2.7,4.74-4.74a0.94,0.94,0,1,1,1.88,0c0,2,2.7,4.74,4.74,4.74a0.94,0.94,0,0,1,0,1.88c-2,0-4.74,2.7-4.74,4.74A0.94,0.94,0,0,1,124.62,34.52Zm-2.73-6.62a8.63,8.63,0,0,1,2.73,2.73,8.63,8.63,0,0,1,2.73-2.73,8.63,8.63,0,0,1-2.73-2.73A8.63,8.63,0,0,1,121.89,27.9Z"
            fill="#d6d6d6"
          />
          <path
            d="M11,90.2A5.24,5.24,0,1,1,16.23,85,5.25,5.25,0,0,1,11,90.2ZM11,82A2.93,2.93,0,1,0,13.93,85,2.94,2.94,0,0,0,11,82Z"
            fill="#d6d6d6"
          />
          <ellipse cx="72.92" cy="189.2" rx="39.62" ry="4.92" fill="#e2e2e2" />
          <line
            x1="74.86"
            y1="42.9"
            x2="88.71"
            y2="42.9"
            fill="none"
            stroke="#5e6c77"
            strokeMiterlimit="10"
            strokeWidth="2"
          />
          <path
            d="M76.62,101.21a1,1,0,0,1-.9-0.56,3.52,3.52,0,0,0-3.2-2.12,3.44,3.44,0,0,0-2.87,2,1,1,0,1,1-1.78-.92,5.41,5.41,0,0,1,4.57-3.06,5.48,5.48,0,0,1,5.07,3.24,1,1,0,0,1-.46,1.34A1,1,0,0,1,76.62,101.21Z"
            fill="#5e6c77"
          />
          <circle cx="56.93" cy="91.61" r="1.81" fill="#5e6c77" />
          <circle cx="88.64" cy="91.61" r="1.81" fill="#5e6c77" />
          <circle cx="57.39" cy="102.1" r="7.23" fill="#f2dde2" />
          <circle cx="88.44" cy="102.34" r="7.23" fill="#f2dde2" />
        </svg>
      ),

      hint: () => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={width}
          height={height}
          viewBox="0 0 18.83 18.83"
        >
          <rect
            x="-28.17"
            y="-39.68"
            width="595.3"
            height="526.67"
            fill="#f4f4f4"
          />
          <rect width="18.83" height="18.83" fill="#d0d8dd" />
          <path
            d="M9.94,3.86V8.43h4.39V9.6H9.94v4.6H8.7V9.6H4.31V8.43H8.7V3.86H9.94Z"
            fill="#f4f4f4"
          />
        </svg>
      )
    };

    return svg[this.props.icon]();
  }
}

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired
  // color: PropTypes.string.isRequired
};
