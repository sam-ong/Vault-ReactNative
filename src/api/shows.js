import axios from 'axios';
import {
  getShowDetailsUrl,
  getShowRecommendationsUrl,
  getSimilarShowsUrl,
  getSeasonsUrl
} from '../api/urls';

// ------------------------------------------------------
// Show details
// ------------------------------------------------------

export const fetchShowInfo = ({ id }, reqParams = {}) =>
  new Promise(async (resolve, reject) => {
    const url = getShowDetailsUrl({ showId: id });

    try {
      const { data } = await axios.get(url, reqParams);
      resolve(data);
    } catch (error) {
      console.log(error);
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
      console.log(error);
      reject(error);
    }
  });

export const fetchSimilarShows = ({ show, page = 1 }, reqParams = {}) =>
  new Promise(async (resolve, reject) => {
    const url = getSimilarShowsUrl({ showId: show.id, page });

    try {
      const { data } = await axios.get(url, reqParams);
      resolve(data);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });

export const getSeason = ({ id, season }, reqParams = {}) => 
  new Promise(async (resolve, reject) => {
    const url = getSeasonsUrl({ showId: id, season });
    try {
      const { data } = await axios.get(url, reqParams);
      resolve(data);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
