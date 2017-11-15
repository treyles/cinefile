import axios from 'axios';

export default function fetchMovieSearch(title) {
  const encodedURI = window.encodeURI(
    `https://api.themoviedb.org/3/search/multi?api_key=529e1b3a6041a4b14bb6b7e328aad991&language=en-US&query=${title}&page=1&include_adult=false`
  );

  return axios.get(encodedURI).then(response => response.data.results);
}
