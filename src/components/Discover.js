import React from 'react';
import DiscoverCard from './DiscoverCard';
import { fetchDiscover } from '../utils/Api';

class Discover extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      matches: [],
      query: {
        mediaType: 'movie',
        page: 1,
        sort: 'popularity.desc',
        releaseFrom: 2000,
        releaseTo: 2017,
        score: 8,
        genre: '878'
      },
      pages: null
    };

    this.handleShow = this.handleShow.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);

    const { query } = this.state;
    fetchDiscover(query).then(response =>
      this.setState({
        matches: response.results,
        pages: response.total_pages
      }));
  }

  handleShow() {
    const { matches, query } = this.state;

    const newQuery = Object.assign({}, query);
    newQuery.page = query.page + 1;

    fetchDiscover(newQuery).then(response =>
      this.setState({
        matches: matches.concat(response.results),
        query: newQuery
      }));
  }

  render() {
    const { matches, query, pages } = this.state;

    return (
      <div className="discover-wrapper">
        <div className="discover">
          {matches.map(media => (
            <DiscoverCard key={media.id} media={media} />
          ))}
        </div>
        {query.page !== pages && matches.length !== 0
          ? <button className="load-more" onClick={this.handleShow}>
              show
            </button>
          : null}
      </div>
    );
  }
}

export default Discover;
