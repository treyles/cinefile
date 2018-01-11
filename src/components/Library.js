import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import LibraryCard from './LibraryCard';
import Search from './Search';
import rebase from '../utils/base';
// import { CSSTransition, TransitionGroup } from 'react-transition-group';
import FlipMove from 'react-flip-move';

// make helper
// const Fade = ({ children, ...props }) => (
//   <CSSTransition
//     {...props}
//     timeout={{ enter: 500, exit: 200 }}
//     classNames="fade"
//   >
//     {children}
//   </CSSTransition>
// );

export default class Library extends React.Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  // TODO: rename mounte to isCounterActive...?
  componentWillMount() {
    this.mounted = true;
  }
  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    const {
      library,
      removeFromLibrary,
      addToLibrary,
      isSearchActive,
      toggleSearchButton,
      currentUser
    } = this.props;

    const preloader = (
      <div className="preloader">
        <div className="rect1" />
        <div className="rect2" />
        <div className="rect3" />
        <div className="rect4" />
        <div className="rect5" />
      </div>
    );

    return (
      <div>
        {/* TODO: better way to do this? */}
        {!library.length &&
          <div className="preloader-container">
            {preloader}
          </div>}
        <Header
          count={library.length}
          toggleSearchButton={toggleSearchButton}
          isSearchActive={isSearchActive}
          currentUser={currentUser}
          isLibraryMounted={this.mounted}
        />
        <div className="library-container">
          {isSearchActive &&
            <Search
              addToLibrary={addToLibrary}
              toggleSearchButton={toggleSearchButton}
              removeFromLibrary={removeFromLibrary}
              library={library}
            />}
          <FlipMove className="library">
            {library.map(media => (
              <LibraryCard
                key={media.id}
                media={media}
                removeFromLibrary={removeFromLibrary}
              />
            ))}
          </FlipMove>
        </div>
      </div>
    );
  }
}

Library.propTypes = {
  library: PropTypes.arrayOf(PropTypes.object),
  removeFromLibrary: PropTypes.func.isRequired,
  addToLibrary: PropTypes.func.isRequired,
  isSearchActive: PropTypes.bool.isRequired,
  toggleSearchButton: PropTypes.func.isRequired
};

Library.defaultProps = {
  library: []
};
