import React from 'react';
import { shallow } from 'enzyme';
import SearchResultList from '../../components/SearchResultList';

const movieResult = [{
  id: 'abc',
  title: 'Contact',
  release_date: '1997-10-30',
  media_type: 'movie'
}]

const tvResult = [{
  id: '123',
  name: 'Stranger Things',
  release_date: '2016-10-30',
  media_type: 'tv'
}]

describe('SearchResultList', () => {
  let component;

  beforeEach(() => {
    component = shallow( <SearchResultList matches={movieResult} /> )
  })

  it('should render correctly', () => {
    expect(component).toMatchSnapshot()
  })

  it('should render correct length of matches', () => {
    component.setProps({
      matches: movieResult.concat(tvResult)
    })

    expect(component.find('li')).toHaveLength(2)
  })

  it('should render movie title if movie', () => {
    component.setProps({
      matches: movieResult
    })

    expect(component.find('li h2').first().text()).toEqual('Contact')
  })

  it('should render tv title if tv', () => {
    component.setProps({
      matches: tvResult
    })

    expect(component.find('li h2').first().text()).toEqual('Stranger Things')
  })

  it('should render year', () => {
    expect(component.find('li h3').first().text()).toEqual('1997')
  })

  it('should render media tag as `Television`', () => {
    component.setProps({
      matches: tvResult
    })

    expect(component.find('.mediatype-tag')).toHaveLength(1)
    expect(component.find('.mediatype-tag').text()).toEqual('Television')
  })

  it('should render media tag as `Movie`', () => {
    component.setProps({
      matches: movieResult
    })

    expect(component.find('.mediatype-tag')).toHaveLength(1)
    expect(component.find('.mediatype-tag').text()).toEqual('Movie')
  })

  it('should render `Delete from library` button if already in library', () => {
    component.setProps({
      matches: [ Object.assign(tvResult[0], {
        inLibrary: true
      })]
    })

    expect(component.find('.mediatype-tag')).toHaveLength(0)
    expect(component.find('.inlibrary-tag')).toHaveLength(1)
  })
})