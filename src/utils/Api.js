// import axios from 'axios';
const axios = require('axios');

export function fetchMediaSearch(title) {
  const encodedURI = window.encodeURI(
    `https://api.themoviedb.org/3/search/multi?api_key=529e1b3a6041a4b14bb6b7e328aad991&language=en-US&query=${title}&page=1&include_adult=false`
  );

  return axios.get(encodedURI).then(response => response.data.results);
}

export function fetchImdbId(media) {
  let encodedURI;

  if (media.media_type === 'movie') {
    encodedURI = window.encodeURI(
      `https://api.themoviedb.org/3/movie/${media.id}?api_key=529e1b3a6041a4b14bb6b7e328aad991`
    );
    return axios.get(encodedURI).then(response => response.data.imdb_id);
  }
  encodedURI = window.encodeURI(
    `http://api.themoviedb.org/3/tv/${media.id}?api_key=529e1b3a6041a4b14bb6b7e328aad991&append_to_response=external_ids`
  );
  return axios
    .get(encodedURI)
    .then(response => response.data.external_ids.imdb_id);
}

// movie: response.data.imdb_id
// tv:    response.data.external_ids.imdb_id
