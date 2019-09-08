import axios from 'axios';
import { getSearchShowsUrl } from '../api/urls';

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
