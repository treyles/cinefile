import React from 'react';
import PropTypes from 'prop-types';
import MediaQuery from 'react-responsive';

export default function TrailerModal({ trailerKey }) {
  return (
    <div>

      {/* mobile */}
      <MediaQuery maxWidth={768}>
        <iframe
          title="trailer"
          src={
            `http://www.youtube.com/embed/${trailerKey}?controls=1&showinfo=0&autoplay=1`
          }
          frameBorder="0"
          playsInline="0"
          allowFullScreen
        />
      </MediaQuery>

      {/* desktop */}
      <MediaQuery minWidth={768}>
        <div className="video-wrapper">
          <iframe
            title="trailer"
            src={
              `http://www.youtube.com/embed/${trailerKey}?controls=1&showinfo=0&autoplay=1`
            }
            style={{ height: '100%' }}
            frameBorder="0"
            allowFullScreen
          />
        </div>
      </MediaQuery>

    </div>
  );
}

TrailerModal.propTypes = {
  trailerKey: PropTypes.string
};

TrailerModal.defaultProps = {
  trailerKey: null
};
