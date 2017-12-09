import React from 'react';
import PropTypes from 'prop-types';

export default function TrailerModal({ trailerLink }) {
  return (
    <div>
      {trailerLink !== 'no trailer'
        ? <iframe
            title="trailer"
            src={trailerLink}
            style={{ height: '100%' }}
            frameBorder="0"
            allowFullScreen
          />
        : <p>Trailer Not Available</p>}
    </div>
  );
}

TrailerModal.propTypes = {
  trailerLink: PropTypes.string
};

TrailerModal.defaultProps = {
  trailerLink: null
};
