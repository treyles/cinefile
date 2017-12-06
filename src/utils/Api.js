import axios from 'axios';

export function fetchMediaSearch(title) {
  const key = '?api_key=529e1b3a6041a4b14bb6b7e328aad991';
  const tmdbAPI = 'https://api.themoviedb.org/3/';

  const encodedURI = window.encodeURI(
    `${tmdbAPI}search/multi${key}&language=en-US&query=${title}&page=1&include_adult=false`
  );

  return axios.get(encodedURI).then(response => response.data.results);
}

export function fetchImdbLink(media) {
  let encodedURI;

  if (media.media_type === 'movie') {
    encodedURI = window.encodeURI(
      `https://api.themoviedb.org/3/movie/${media.id}?api_key=529e1b3a6041a4b14bb6b7e328aad991`
    );

    return axios
      .get(encodedURI)
      .then(
        response => `http://www.imdb.com/title/${response.data.imdb_id}`
      );
  }

  encodedURI = window.encodeURI(
    `http://api.themoviedb.org/3/tv/${media.id}?api_key=529e1b3a6041a4b14bb6b7e328aad991&append_to_response=external_ids`
  );

  return axios
    .get(encodedURI)
    .then(
      response =>
        `http://www.imdb.com/title/${response.data.external_ids.imdb_id}`
    );
}

export function fetchTrailer(media) {
  let encodedURI;

  if (media.media_type === 'movie') {
    encodedURI = window.encodeURI(
      `https://api.themoviedb.org/3/movie/${media.id}/videos?api_key=529e1b3a6041a4b14bb6b7e328aad991&language=en-US`
    );

    return axios.get(encodedURI).then(response => {
      if (response.data.results.length) {
        return `http://www.youtube.com/embed/${response.data.results[0].key}?controls=1&showinfo=0&autoplay=1`;
      }

      return null;
    });
  }

  encodedURI = window.encodeURI(
    `https://api.themoviedb.org/3/tv/${media.id}/videos?api_key=529e1b3a6041a4b14bb6b7e328aad991&language=en-US`
  );

  return axios.get(encodedURI).then(response => {
    if (response.data.results.length) {
      return `http://www.youtube.com/embed/${response.data.results[0].key}?controls=1&showinfo=0&autoplay=1`;
    }

    return null;
  });
}

export function fetchDiscover(obj) {
  const key = '?api_key=529e1b3a6041a4b14bb6b7e328aad991';
  const tmdbAPI = 'https://api.themoviedb.org/3/';
  let encodedURI;

  if (obj.mediaType === 'movie') {
    encodedURI = window.encodeURI(
      `${tmdbAPI}discover/movie${key}&sort_by=${obj.sort}&primary_release_date.gte=${obj.releaseFrom}&primary_release_date.lte=${obj.releaseTo}&vote_average.gte=${obj.score}&with_genres=${obj.genre}&page=${obj.page}&vote_count.gte=5`
    );
  } else {
    encodedURI = window.encodeURI(
      `${tmdbAPI}discover/tv${key}&sort_by=${obj.sort}&first_air_date.gte=${obj.releaseFrom}&first_air_date.lte=${obj.releaseTo}&vote_average.gte=${obj.score}&with_genres=${obj.genre}&page=${obj.page}&vote_count.gte=5`
    );
  }

  return axios.get(encodedURI).then(response => response.data);
}

export function fetchGenres() {
  const genres = [];
  const key = '?api_key=529e1b3a6041a4b14bb6b7e328aad991';
  const tmdbAPI = 'https://api.themoviedb.org/3/';

  const movieGenreURI = window.encodeURI(
    `${tmdbAPI}genre/movie/list${key}`
  );
  const tvGenreURI = window.encodeURI(`${tmdbAPI}genre/tv/list${key}`);

  return axios.get(movieGenreURI).then(response => console.log(response));
}
