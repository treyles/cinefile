import React from 'react';
import { shallow } from 'enzyme';
import ReactModal from 'react-modal';
import DiscoverCard from '../../components/DiscoverCard';
import { movies, tv } from '../mock/media.json';

global.scrollTo = jest.fn();
 
describe('DiscoverCard', () => {
  describe('given a movie object', () => {
    let component;
    const props = {
      media: movies,
      addToLibrary: jest.fn(),
      currentPage: 1,
      handleRemoveMatch: jest.fn()
    };

    beforeEach(() => {
      component = shallow(<DiscoverCard {...props} />);
    });

    it('should render correctly', () => {
      expect(component).toMatchSnapshot();
    });

    it('should render director in header', () => {
      expect(component.find('.discover-header span').text()).toEqual(
        'Director:'
      );
    });

    it('should render lead in footer', () => {
      expect(
        component
          .find('.discover-footer span')
          .at(0)
          .text()
      ).toEqual('Lead:');
    });

    it('should not render trailer icon if no trailerKey', () => {
      expect(component.find('.trailer').length).toEqual(0);
    });

    it('should render trailer icon if trailerKey exists', () => {
      component.setState({
        trailerKey: 'ujmoYyEyDP8'
      });

      expect(component.find('.trailer').length).toEqual(1);
    });

    it('should open trailer when trailer icon clicked', () => {
      component.setState({
        trailerKey: 'ujmoYyEyDP8'
      });

      component.find('.trailer').simulate('click')
      expect(component.find(ReactModal).prop('isOpen')).toEqual(true)
    });
  });

  describe('given a tv object', () => {
    let component;
    const props = {
      media: tv,
      addToLibrary: jest.fn(),
      currentPage: 1,
      handleRemoveMatch: jest.fn()
    };

    beforeEach(() => {
      component = shallow(<DiscoverCard {...props} />);
    });

    it('should render correctly', () => {
      expect(component).toMatchSnapshot();
    });

    it('should render creator in header', () => {
      // component.find(.discover-header)
      expect(component.find('.discover-header span').text()).toEqual(
        'Creator:'
      );
    });

    it('should render seasons in footer', () => {
      expect(
        component
          .find('.discover-footer span')
          .at(0)
          .text()
      ).toEqual('Seasons:');
    });

    it('should not render trailer icon if no trailerKey', () => {
      expect(component.find('.trailer').length).toEqual(0);
    });

    it('should render trailer icon if trailerKey exists', () => {
      component.setState({
        trailerKey: 'ujmoYyEyDP8'
      });

      expect(component.find('.trailer').length).toEqual(1);
    });
  });
});
