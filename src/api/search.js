import axios from 'axios';
import { getSearchShowsUrl, getDiscoverShowsUrl } from '../api/urls';

// ------------------------------------------------------
// Show details
// ------------------------------------------------------

export const fetchSearchResults = ({ query }, reqParams = {}) =>
  new Promise(async (resolve, reject) => {
    const url = getSearchShowsUrl({ query: query });
    try {
      const { data } = await axios.get(url, reqParams);
      resolve(data);
    } catch (error) {
      Config.logNetworkErrors && console.log(error);
      reject(error);
    }
  });

export const fetchDiscoverResults = ({sort_by}, reqParams = {}) => 
  new Promise(async(resolve, reject) => {
    const url = getDiscoverShowsUrl({ sort_by: sort_by })

    try {
      const { data } = await axios.get(url, reqParams);

      resolve(data);
    } catch (error) {
      Config.logNetworkErrors && console.log(error);
      reject(error);
    }
  });
