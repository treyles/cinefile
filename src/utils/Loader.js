import React from 'react';
import PropTypes from 'prop-types';

export default function Loader({ showMoreButton }) {
  return (
    <div className={`${showMoreButton ? 'load-more ' : ''}preloader`}>
      <div className="rect1" />
      <div className="rect2" />
      <div className="rect3" />
      <div className="rect4" />
      <div className="rect5" />
    </div>
  );
}

Loader.propTypes = {
  showMoreButton: PropTypes.bool
};

Loader.defaultProps = {
  showMoreButton: false
};
