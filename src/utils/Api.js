// TODO:
// add error: console.log(error) catch?
// how to hide api key?
// add back slider logic?

import axios from 'axios';

const apiKey = '?api_key=529e1b3a6041a4b14bb6b7e328aad991';
const tmdbAPI = 'https://api.themoviedb.org/3/';

export function fetchMediaSearch(title) {
  const base = `${tmdbAPI}search/multi`;
  const query = `&query=${title}`;
  const toEncode = [base, apiKey, query].join('');

  const encodedURI = window.encodeURI(toEncode);
  return axios.get(encodedURI).then(response => response.data.results);
}

function buildURI(obj, removeMedia) {
  return Object.keys(obj)
    .filter(k => !k.includes(removeMedia))
    .map(k => obj[k])
    .join('');
}

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

  // check if media is movie ('title' key is unique to movies)
  if (media.title) {
    toEncode = buildURI(uriParams, 'tv');
  } else {
    toEncode = buildURI(uriParams, 'movie');
  }

  const encodedURI = window.encodeURI(toEncode);
  return axios.get(encodedURI).then(response => response.data);
}

export function fetchDiscover(obj) {
  let toEncode;
  // console.log(obj.genre)
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

  if (obj.mediaType === 'movie') {
    toEncode = buildURI(uriParams, 'tv');
  } else {
    toEncode = buildURI(uriParams, 'movie');
  }

  const encodedURI = window.encodeURI(toEncode);
  return axios.get(encodedURI).then(response => response.data);
}

export function getCardDetails(media) {
  const { videos: { results } } = media;
  let imdb;
  let mediaCredits;

  // if movie ('title' key unique to movies)
  if (media.title) {
    const { credits: { crew, cast } } = media;
    imdb = media.imdb_id;

    const getDirector = crew.filter(el => el.job === 'Director');
    const leadNum = Math.min(...cast.map(el => el.order));
    const getLead = cast.filter(el => el.order === leadNum);

    mediaCredits = {
      header: getDirector.length ? getDirector[0].name : 'n/a',
      footer: getLead.length ? getLead[0].name : 'n/a'
    };
  } else {
    const { created_by, number_of_seasons } = media;
    imdb = media.external_ids.imdb_id;

    mediaCredits = {
      header: created_by.length ? created_by[0].name : 'n/a',
      footer: number_of_seasons ? number_of_seasons : 'n/a'
    };
  }

  return {
    data: media,
    imdbId: imdb,
    credits: mediaCredits,
    trailerKey: results.length ? results[0].key : null
  };
}
