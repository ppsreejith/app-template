import axios from 'axios';
import _ from 'lodash';
import queryString from 'query-string';

export const SERVER = 'http://localhost:3000';

const decideRequest = (prom, resolve, reject) =>
  prom
    .then(res =>
      (_.get(res, 'data.success')
        ? resolve(_.get(res, 'data.data'))
        : reject(_.get(res, 'data.message', res))))
    .catch(err =>
      reject(_.get(err, 'response.data.message', err)));

const addJsonParams = (url, data) => {
  if (_.isEmpty(data)) {
    return url;
  }
  return _.join(
    [
      url,
      queryString.stringify(data)
    ],
    _.indexOf(url, '?') === -1 ? '?' : '&'
  );
};

export default ({
  method, url, headers, baseURL, data
}) => {
  if (!method || method == 'GET') {
    data = data || {};
    url = addJsonParams(url, data);
  }

  return new Promise((resolve, reject) => {
    const axiosPromise = axios({
      method: method || 'GET',
      baseURL: baseURL || SERVER,
      url,
      data,
      headers: _.extend(
        {
          'app-version': '1.0.0'
        },
        headers
      )
    });
    decideRequest(axiosPromise, resolve, reject);
  });
};
