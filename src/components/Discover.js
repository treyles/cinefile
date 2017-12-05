import React from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import DiscoverCard from './DiscoverCard';
import OptionsModal from './OptionsModal';
import { fetchDiscover } from '../utils/Api';
import Icon from '../utils/Icon';
import Slider from 'rc-slider';

export default class Discover extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      matches: [],
      pages: null,
      showModal: false,
      query: {
        mediaType: 'movie',
        page: 1,
        sort: 'popularity.desc',
        releaseFrom: 2000,
        releaseTo: 2017,
        score: 8,
        genre: '878'
      }
    };

    this.handleShowMore = this.handleShowMore.bind(this);
    this.handleOptionsModal = this.handleOptionsModal.bind(this);
  }

  componentDidMount() {
    // scroll to top of page on mount
    window.scrollTo(0, 0);

    const { query } = this.state;
    fetchDiscover(query).then(response => {
      const matches = this.handleResultFilter(response.results);

      this.setState({
        matches,
        pages: response.total_pages
      });
    });
  }

  // filter to return media not already in library
  handleResultFilter(results) {
    const { library } = this.props;
    return results.filter(
      result => library.findIndex(el => el.id === result.id) === -1
    );
  }

  handleShowMore() {
    const { matches, query } = this.state;

    // copy object without mutating
    const newQuery = Object.assign({}, query, {
      page: query.page + 1
    });

    fetchDiscover(newQuery).then(response => {
      const newMatches = this.handleResultFilter(response.results);

      this.setState({
        matches: matches.concat(newMatches),
        query: newQuery
      });
    });
  }

  handleOptionsModal() {
    this.setState({
      showModal: !this.state.showModal
    });
  }

  render() {
    const { matches, query, pages, showModal } = this.state;

    return (
      <div className="discover">
        <div className="options" onClick={this.handleOptionsModal}>
          <Icon icon="menu2" width="25" height="25" />
        </div>
        {matches.map(media => (
          <DiscoverCard key={media.id} media={media} />
        ))}
        {query.page !== pages && matches.length !== 0
          ? <button className="load-more" onClick={this.handleShowMore}>
              Show More
            </button>
          : null}
        <ReactModal
          isOpen={showModal}
          onRequestClose={this.handleOptionsModal}
          className="options-modal"
          overlayClassName="options-modal-overlay"
        >
          <OptionsModal />
        </ReactModal>
      </div>
    );
  }
}

Discover.propTypes = {
  library: PropTypes.arrayOf(PropTypes.object)
};

Discover.defaultProps = {
  library: []
};
