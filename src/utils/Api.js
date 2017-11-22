// import axios from 'axios';
const axios = require('axios');

export default function fetchMediaSearch(title) {
  const encodedURI = window.encodeURI(
    `https://api.themoviedb.org/3/search/multi?api_key=529e1b3a6041a4b14bb6b7e328aad991&language=en-US&query=${title}&page=1&include_adult=false`
  );

  return axios.get(encodedURI).then(response => response.data.results);
}

// function rt(imdbId) {
//   const encodedURI = window.encodeURI(
//     `http://www.omdbapi.com/?apikey=79953b3d&i=${imdbId}`
//   );

//   return axios
//     .get(encodedURI)
//     .then(response => response.data.Ratings[1].Value);
// }

// export function fetchRTscore(id) {
//   const encodedURI = window.encodeURI(
//     `https://api.themoviedb.org/3/movie/${id}?api_key=529e1b3a6041a4b14bb6b7e328aad991`
//   );

//   return axios.get(encodedURI).then(response => rt(response.data.imdb_id));
// }
