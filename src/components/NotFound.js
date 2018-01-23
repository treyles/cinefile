import React from 'react';
import Icon from '../utils/Icon';
import MediaQuery from 'react-responsive';

export default function NotFound() {
  return (
    <div className="lobby not-found">
      <div className="empty-message">
        <div className="illustration">
          <MediaQuery minWidth={768}>
            <Icon icon="sad" width="218" height="100%" />
          </MediaQuery>
          <MediaQuery maxWidth={768}>
            <Icon icon="sadMobile" width="137" height="100%" />
          </MediaQuery>
        </div>
        <h1>Page Not Found!</h1>
        <h2>The page you are looking for doesn&apos;t exist</h2>
      </div>
    </div>
  );
}
