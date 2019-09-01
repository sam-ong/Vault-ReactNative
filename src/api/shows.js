import axios from 'axios';
import {
  getSearchShowsUrl,
  getShowDetailsUrl,
  getShowRecommendationsUrl,
  getSimilarShowsUrl,
  getPopularShowsUrl
} from '../api/urls';

// ------------------------------------------------------
// Show details
// ------------------------------------------------------

export const fetchShowInfo = ({ show }, reqParams = {}) =>
  new Promise(async (resolve, reject) => {
    const url = getShowDetailsUrl({ showId: show.id });

    try {
      const { data } = await axios.get(url, reqParams);
      resolve(data);
    } catch (error) {
      Config.logNetworkErrors && console.log(error);
      reject(error);
    }
  });

export const fetchShowRecommendations = ({ show, page = 1 }, reqParams = {}) =>
  new Promise(async (resolve, reject) => {
    const url = getShowRecommendationsUrl({ showId: show.id, page });

    try {
      const { data } = await axios.get(url, reqParams);
      resolve(data);
    } catch (error) {
      Config.logNetworkErrors && console.log(error);
      reject(error);
    }
  });

// ------------------------------------------------------
// Search
// ------------------------------------------------------

export const fetchSearchShows = ({ page, query }, reqParams = {}) =>
  new Promise(async (resolve, reject) => {
    const url = getSearchShowsUrl({ page, query });

    try {
      const { data } = await axios.get(url, reqParams);
      resolve(data);
    } catch (error) {
      Config.logNetworkErrors && console.log(error);
      reject(error);
    }
  });
