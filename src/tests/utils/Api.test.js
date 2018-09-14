import { getCardDetails } from '../../utils/Api';
import data from '../__mocks__/details.json';

describe('getCardDetails', () => {
  describe('given a movie object', () => {
    let movies;

    beforeEach(() => {
      // deep copy
      movies = JSON.parse(JSON.stringify(data.movies));
    });

    it('should return imdb id', () => {
      expect(getCardDetails(movies)).toHaveProperty('imdbId', 'tt2379713');
    });

    it('should return director in header', () => {
      expect(getCardDetails(movies)).toHaveProperty(
        'credits.header',
        'Sam Mendes'
      );
    });

    it('should return n/a in header if no director', () => {
      movies.credits.crew[1].job = '';

      expect(getCardDetails(movies)).toHaveProperty(
        'credits.header',
        'n/a'
      );
    });

    it('should return n/a in header if no crew', () => {
      movies.credits.crew = [];

      expect(getCardDetails(movies)).toHaveProperty(
        'credits.header',
        'n/a'
      );
    });

    it('should return lead actor in footer', () => {
      expect(getCardDetails(movies)).toHaveProperty(
        'credits.footer',
        'Daniel Craig'
      );
    });

    it('should return n/a in footer if no crew', () => {
      movies.credits.cast = [];

      expect(getCardDetails(movies)).toHaveProperty(
        'credits.footer',
        'n/a'
      );
    });

    it('should return youtube trailer key', () => {
      expect(getCardDetails(movies)).toHaveProperty(
        'trailerKey',
        'ujmoYyEyDP8'
      );
    });

    it('should return null if no youtube trailer key', () => {
      movies.videos.results = [];

      expect(getCardDetails(movies)).toHaveProperty('trailerKey', null);
    });
  });

  describe('given a tv object', () => {
    let tv;

    beforeEach(() => {
      // deep copy
      tv = JSON.parse(JSON.stringify(data.tv));
    });

    it('should return imdb id', () => {
      expect(getCardDetails(tv)).toHaveProperty('imdbId', 'tt5290382');
    });

    it('should return creator in header', () => {
      expect(getCardDetails(tv)).toHaveProperty(
        'credits.header',
        'Joe Penhall'
      );
    });

    it('should return first creator in header if multiple creators', () => {
      tv.created_by.push({
        name: 'second creator'
      });

      expect(getCardDetails(tv)).toHaveProperty(
        'credits.header',
        'Joe Penhall'
      );
    });

    it('should return n/a in header if no creator', () => {
      tv.created_by = [];

      expect(getCardDetails(tv)).toHaveProperty('credits.header', 'n/a');
    });

    it('should return seasons in footer', () => {
      expect(getCardDetails(tv)).toHaveProperty('credits.footer', 1);
    });

    it('should return n/a in footer if no seasons', () => {
      tv.number_of_seasons = null;

      expect(getCardDetails(tv)).toHaveProperty('credits.footer', 'n/a');
    });

    it('should return youtube trailer key', () => {
      expect(getCardDetails(tv)).toHaveProperty(
        'trailerKey',
        '407GVB88b60'
      );
    });

    it('should return null if no youtube trailer key', () => {
      tv.videos.results = [];

      expect(getCardDetails(tv)).toHaveProperty('trailerKey', null);
    });
  });
});
