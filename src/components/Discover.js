import React from 'react';
import DiscoverCard from './DiscoverCard';

class Discover extends React.Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div className="discover">
        <DiscoverCard />
        <DiscoverCard />
        <DiscoverCard />
      </div>
    );
  }
}

export default Discover;
