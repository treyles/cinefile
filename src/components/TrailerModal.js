import React from 'react';
import PropTypes from 'prop-types';

export default function TrailerModal({ trailerKey }) {
  return (
    <div>
      <div className="video-wrapper">
        <iframe
          title="trailer"
          src={`https://www.youtube.com/embed/${trailerKey}?controls=1&showinfo=0&autoplay=1`}
          style={{ height: '100%' }}
          frameBorder="0"
          allowFullScreen
        />
      </div>
    </div>
  );
}

TrailerModal.propTypes = {
  trailerKey: PropTypes.string
};

TrailerModal.defaultProps = {
  trailerKey: null
};
