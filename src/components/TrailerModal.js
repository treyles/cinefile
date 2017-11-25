import React from 'react';
import PropTypes from 'prop-types';

export default function TrailerModal({ trailerLink }) {
  return (
    <div>
      {trailerLink !== null
        ? <iframe
            title="trailer"
            src={trailerLink}
            frameBorder="0"
            allowFullScreen
          />
        : <p>sorry no trailer</p>}
    </div>
  );
}

TrailerModal.propTypes = {
  trailerLink: PropTypes.string
};

TrailerModal.defaultProps = {
  trailerLink: null
};
