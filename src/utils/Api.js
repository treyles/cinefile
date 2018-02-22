import axios from 'axios';

export function fetchMediaSearch(title) {
  const key = '?api_key=529e1b3a6041a4b14bb6b7e328aad991';
  const tmdbAPI = 'https://api.themoviedb.org/3/';

  const encodedURI = window.encodeURI(
    `${tmdbAPI}search/multi${key}&language=en-US&query=${title}&page=1&include_adult=false`
  );

  return axios.get(encodedURI).then(response => response.data.results);
}

// export function fetchImdbLink(media) {
//   let encodedURI;

//   if (media.title) {
//     encodedURI = window.encodeURI(
//       `https://api.themoviedb.org/3/movie/${media.id}?api_key=529e1b3a6041a4b14bb6b7e328aad991`
//     );

//     return axios
//       .get(encodedURI)
//       .then(
//         response => `http://www.imdb.com/title/${response.data.imdb_id}`
//       );
//   }

//   encodedURI = window.encodeURI(
//     `http://api.themoviedb.org/3/tv/${media.id}?api_key=529e1b3a6041a4b14bb6b7e328aad991&append_to_response=external_ids`
//   );

//   return axios
//     .get(encodedURI)
//     .then(
//       response =>
//         `http://www.imdb.com/title/${response.data.external_ids.imdb_id}`
//     );
// }

export function fetchMediaDetails(media) {
  let encodedURI;

  if (media.title) {
    encodedURI = window.encodeURI(
      `https://api.themoviedb.org/3/movie/${
        media.id
      }?api_key=529e1b3a6041a4b14bb6b7e328aad991&append_to_response=videos,credits`
    );

    return axios.get(encodedURI).then(response => response.data);
  }

  encodedURI = window.encodeURI(
    `https://api.themoviedb.org/3/tv/${
      media.id
    }?api_key=529e1b3a6041a4b14bb6b7e328aad991&append_to_response=external_ids,videos,credits`
  );

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
  const key = '?api_key=529e1b3a6041a4b14bb6b7e328aad991';
  const tmdbAPI = 'https://api.themoviedb.org/3/';
  let encodedURI;

  const releaseFrom = obj.releaseDates[0];
  const releaseTo =
    obj.releaseDates[1] === obj.releaseDates[0]
      ? obj.releaseDates[1] + 1
      : obj.releaseDates[1];
  const genres = obj.genre.map(genre => genre.value).toString();

  if (obj.mediaType === 'movie') {
    encodedURI = window.encodeURI(
      `${tmdbAPI}discover/movie${key}&sort_by=${
        obj.sort.value
      }&primary_release_date.gte=${releaseFrom}&primary_release_date.lte=${releaseTo}&vote_average.gte=${
        obj.score
      }&with_genres=${genres}&page=${obj.page}&vote_count.gte=20`
    );
  } else {
    encodedURI = window.encodeURI(
      `${tmdbAPI}discover/tv${key}&sort_by=${
        obj.sort.value
      }&first_air_date.gte=${releaseFrom}&first_air_date.lte=${releaseTo}&vote_average.gte=${
        obj.score
      }&with_genres=${genres}&page=${obj.page}&vote_count.gte=20`
    );
  }

  return axios.get(encodedURI).then(response => response.data);
}

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
