import { getCardDetails } from '../utils/Api';
import data from './mocks/mediaMock.json';

describe('getCardDetails', () => {
  describe('given a movie object', () => {
    let movies;

    beforeEach(() => {
      // deep copy
      movies = JSON.parse(JSON.stringify(data.movies));
    });

    it('should return imdb id', () => {
      const details = getCardDetails(movies);
      expect(details).toHaveProperty('imdbId', 'tt2379713');
    });

    it('should return director in header', () => {
      const details = getCardDetails(movies);
      expect(details).toHaveProperty('credits.header', 'Sam Mendes');
    });

    it('should return n/a in header if no director', () => {
      movies.credits.crew[1].job = '';

      const details = getCardDetails(movies);
      expect(details).toHaveProperty('credits.header', 'n/a');
    });

    it('should return n/a in header if no crew', () => {
      movies.credits.crew = [];

      const details = getCardDetails(movies);
      expect(details).toHaveProperty('credits.header', 'n/a');
    });

    it('should return lead actor in footer', () => {
      const details = getCardDetails(movies);
      expect(details).toHaveProperty('credits.footer', 'Daniel Craig');
    });

    it('should return n/a in footer if no crew', () => {
      movies.credits.cast = [];

      const details = getCardDetails(movies);
      expect(details).toHaveProperty('credits.footer', 'n/a');
    });

    it('should return youtube trailer key', () => {
      const details = getCardDetails(movies);
      expect(details).toHaveProperty('trailerKey', 'ujmoYyEyDP8');
    });

    it('should return null if no youtube trailer key', () => {
      movies.videos.results = [];

      const details = getCardDetails(movies);
      expect(details).toHaveProperty('trailerKey', null);
    });
  });

  describe('given a tv object', () => {
    let tv;

    beforeEach(() => {
      // deep copy
      tv = JSON.parse(JSON.stringify(data.tv));
    });

    it('should return imdb id', () => {
      const details = getCardDetails(tv);
      expect(details).toHaveProperty('imdbId', 'tt5290382');
    });

    it('should return creator in header', () => {
      const details = getCardDetails(tv);
      expect(details).toHaveProperty('credits.header', 'Joe Penhall');
    });

    it('should return first creator in header if multiple creators', () => {
      tv.created_by.push({
        name: 'second creator'
      });

      const details = getCardDetails(tv);
      expect(details).toHaveProperty('credits.header', 'Joe Penhall');
    });

    it('should return n/a in header if no creator', () => {
      tv.created_by = [];

      const details = getCardDetails(tv);
      expect(details).toHaveProperty('credits.header', 'n/a');
    });

    it('should return seasons in footer', () => {
      const details = getCardDetails(tv);
      expect(details).toHaveProperty('credits.footer', 1);
    });

    it('should return n/a in footer if no seasons', () => {
      tv.number_of_seasons = null;

      const details = getCardDetails(tv);
      expect(details).toHaveProperty('credits.footer', 'n/a');
    });

    it('should return youtube trailer key', () => {
      const details = getCardDetails(tv);
      expect(details).toHaveProperty('trailerKey', '407GVB88b60');
    });

    it('should return null if no youtube trailer key', () => {
      tv.videos.results = [];

      const details = getCardDetails(tv);
      expect(details).toHaveProperty('trailerKey', null);
    });
  });
});
