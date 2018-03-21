import React from 'react';
import { shallow, mount } from 'enzyme';
import { MemoryRouter } from 'react-router';
import App from '../../components/App';
import Home from '../../components/Home';
import NotFound from '../../components/NotFound';


describe('App', () => {
  let component;

  beforeEach(() => {
      component = shallow(<App />);
  })

  it('should render correctly', () => {
    expect(component).toMatchSnapshot()
  })

  it('should render render `Home` if currentUser is null', () => {
    const mountedComponent = mount(
      <MemoryRouter initialEntries={[ '/' ]}>
        <App/>
      </MemoryRouter>
    )

    expect(mountedComponent.find(Home)).toHaveLength(1)
  })

  it('should render `NotFound` if visiting unknown path', () => {
    const mountedComponent = mount(
      <MemoryRouter initialEntries={[ '/unknownpath' ]}>
        <App/>
      </MemoryRouter>
    )
    
    expect(mountedComponent.find(NotFound)).toHaveLength(1)
  })

  it('should push new media with `addToLibrary`', () => {
    const media = { one: 'one' }

    component.instance().addToLibrary(media)
    expect(component.state().library).toHaveLength(1)
  })

  it('should push new media to top (index 0) with `addToLibrary`', () => {
    component.setState({
      library: [{ one: 'one'}]
    })

    const media = { two: 'two' }

    component.instance().addToLibrary(media)
    expect(component.state().library[0]).toEqual(media)
  })

  it('should remove new media with `removeFromLibrary`', () => {
    const media = { one: 'one' }
    const mediaTwo = {two: 'two'}

    component.setState({
      library: [media, mediaTwo]
    })

    component.instance().removeFromLibrary(media)

    expect(component.state().library).toHaveLength(1)
    expect(component.state().library[0]).toEqual(mediaTwo)
  })

  it('should load recommended media on user request', () => {
    component.instance().addRecommended()
    expect(component.state().library).toHaveLength(14)

  })
})