import axios from 'axios';

const apiKey = '?api_key=529e1b3a6041a4b14bb6b7e328aad991';
const tmdbAPI = 'https://api.themoviedb.org/3/';

// var params = {
//     parameter1: 'value_1',
//     parameter2: 'value 2',
//     parameter3: 'value&3'
// };

// var esc = encodeURIComponent;
// var query = Object.keys(params)
//     .map(k => esc(k) + '=' + esc(params[k]))
//     .join('&');

// var apiroot = "http://hndroidapi.appspot.com";
// var path = "/best/format/json/page/";
// var params = "?appid=RAPID&callback=?";
// var url = [apiroot, path, params].join("");

// how should structure api: https://www.youtube.com/watch?v=3G_yyE5GeIk @:43
// add error: console.log(error)?
// how to hide api key?

export function fetchMediaSearch(title) {
  const base = `${tmdbAPI}search/multi`;
  const query = `&query=${title}`;
  const toEncode = [base, apiKey, query].join('');

  const encodedURI = window.encodeURI(toEncode);
  return axios.get(encodedURI).then(response => response.data.results);
}

// export function fetchMediaSearch(title) {
//   const encodedURI = window.encodeURI(
//     `${tmdbAPI}search/multi${apiKey}&query=${title}`
//   );

//   return axios.get(encodedURI).then(response => response.data.results);
// }

// export function fetchMediaDetails(media) {
//   let encodedURI;
//   const isMovie = media.title;

//   if (isMovie) {
//     encodedURI = window.encodeURI(
//       `${tmdbAPI}movie/${
//         media.id
//       }${apiKey}&append_to_response=videos,credits`
//     );

//     return axios.get(encodedURI).then(response => response.data);
//   }

//   encodedURI = window.encodeURI(
//     `https://api.themoviedb.org/3/tv/${
//       media.id
//     }?api_key=529e1b3a6041a4b14bb6b7e328aad991&append_to_response=external_ids,videos,credits`
//   );

//   return axios.get(encodedURI).then(response => response.data);
// }

// export function fetchMediaDetails(media) {
//   const movieBase = `${tmdbAPI}movie/`;
//   const movieAppend = '&append_to_response=videos,credits';
//   const tvBase = `${tmdbAPI}tv/`;
//   const tvAppend = '&append_to_response=external_ids,videos,credits';
//   const movieURI = [movieBase, media.id, apiKey, movieAppend].join('');
//   const tvURI = [tvBase, media.id, apiKey, tvAppend].join('');

//   let encodedURI;
//   // check if media is movie (title key is unique to movies)
//   if (media.title) {
//     encodedURI = window.encodeURI(movieURI);
//   } else {
//     encodedURI = window.encodeURI(tvURI);
//   }

//   return axios.get(encodedURI).then(response => response.data);
// }

export function fetchMediaDetails(media) {
  let toEncode;

  const uriParams = {
    movieBase: `${tmdbAPI}movie/`,
    tvBase: `${tmdbAPI}tv/`,
    id: media.id,
    key: apiKey,
    movieAppend: '&append_to_response=videos,credits',
    tvAppend: '&append_to_response=external_ids,videos,credits'
  };

  const buildURI = removeMedia =>
    Object.keys(uriParams)
      .filter(k => !k.includes(removeMedia))
      .map(k => uriParams[k])
      .join('');

  // check if media is movie ('title' key is unique to movies)
  if (media.title) {
    toEncode = buildURI('tv');
  } else {
    toEncode = buildURI('movie');
  }

  const encodedURI = window.encodeURI(toEncode);
  return axios.get(encodedURI).then(response => response.data);
}

// export function fetchTrailer(media) {
//   let encodedURI;

//   if (media.title) {
//     encodedURI = window.encodeURI(
//       `https://api.themoviedb.org/3/movie/${media.id}/videos?api_key=529e1b3a6041a4b14bb6b7e328aad991&language=en-US`
//     );

//     return axios.get(encodedURI).then(response => {
//       if (response.data.results.length) {
//         return `http://www.youtube.com/embed/${response.data.results[0].key}?controls=1&showinfo=0&autoplay=1`;
//       }

//       return 'no trailer';
//     });
//   }

//   encodedURI = window.encodeURI(
//     `https://api.themoviedb.org/3/tv/${media.id}/videos?api_key=529e1b3a6041a4b14bb6b7e328aad991&language=en-US`
//   );

//   return axios.get(encodedURI).then(response => {
//     if (response.data.results.length) {
//       return `http://www.youtube.com/embed/${response.data.results[0].key}?controls=1&showinfo=0&autoplay=1`;
//     }

//     return 'no trailer';
//   });
// }

// TODO: make options variables that include '&sort_by=' etc.
export function fetchDiscover(obj) {
  let toEncode;
  const genres = obj.genre.map(g => g.value).toString();

  const uriParams = {
    movieBase: `${tmdbAPI}discover/movie`,
    tvBase: `${tmdbAPI}discover/tv`,
    key: apiKey,
    sort: `&sort_by=${obj.sort.value}`,
    movieReleaseFrom: `&primary_release_date.gte=${obj.releaseDates[0]}`,
    movieReleaseTo: `&primary_release_date.lte=${obj.releaseDates[1]}`,
    tvReleaseFrom: `&first_air_date.gte=${obj.releaseDates[0]}`,
    tvReleaseTo: `&first_air_date.lte=${obj.releaseDates[1]}`,
    score: `&vote_average.gte=${obj.score}`,
    genres: `&with_genres=${genres}`,
    page: `&page=${obj.page}`,
    voteCount: `&vote_count.gte=20`
  };

  const buildURI = removeMedia =>
    Object.keys(uriParams)
      .filter(k => !k.includes(removeMedia))
      .map(k => uriParams[k])
      .join('');

  if (obj.mediaType === 'movie') {
    toEncode = buildURI('tv');
  } else {
    toEncode = buildURI('movie');
  }

  const encodedURI = window.encodeURI(toEncode);
  return axios.get(encodedURI).then(response => response.data);
}

// export function fetchDiscover(obj) {
//   let encodedURI;

//   const releaseFrom = obj.releaseDates[0];
//   const releaseTo =
//     obj.releaseDates[1] === obj.releaseDates[0]
//       ? obj.releaseDates[1] + 1
//       : obj.releaseDates[1];
//   const genres = obj.genre.map(genre => genre.value).toString();

//   if (obj.mediaType === 'movie') {
//     encodedURI = window.encodeURI(
//       `${tmdbAPI}discover/movie${apiKey}&sort_by=${
//         obj.sort.value
//       }&primary_release_date.gte=${releaseFrom}&primary_release_date.lte=${releaseTo}&vote_average.gte=${
//         obj.score
//       }&with_genres=${genres}&page=${obj.page}&vote_count.gte=20`
//     );
//   } else {
//     encodedURI = window.encodeURI(
//       `${tmdbAPI}discover/tv${apiKey}&sort_by=${
//         obj.sort.value
//       }&first_air_date.gte=${releaseFrom}&first_air_date.lte=${releaseTo}&vote_average.gte=${
//         obj.score
//       }&with_genres=${genres}&page=${obj.page}&vote_count.gte=20`
//     );
//   }

//   return axios.get(encodedURI).then(response => response.data);
// }

// export function fetchMediaCredits(media) {
//   let encodedURI;

//   if (media.title) {
//     encodedURI = window.encodeURI(
//       `https://api.themoviedb.org/3/movie/${media.id}/credits?api_key=529e1b3a6041a4b14bb6b7e328aad991`
//     );

//     return axios.get(encodedURI).then(response => {
//       const data = response.data;
//       return {
//         header: data.crew.length
//           ? data.crew.filter(el => el.job === 'Director')[0].name
//           : 'n/a',
//         footer: data.cast.length
//           ? data.cast.filter(el => el.order < 3)[0].name
//           : 'n/a'
//       };
//     });
//   }

//   encodedURI = window.encodeURI(
//     `http://api.themoviedb.org/3/tv/${media.id}?api_key=529e1b3a6041a4b14bb6b7e328aad991&append_to_response=external_ids`
//   );

//   return axios.get(encodedURI).then(response => {
//     const data = response.data;
//     return {
//       header: data.created_by.length ? data.created_by[0].name : 'n/a',
//       footer: data.number_of_seasons
//     };
//   });
// }
