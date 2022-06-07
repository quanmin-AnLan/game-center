import axios from 'axios';
import qs from 'qs';
import { Message } from 'element-ui';

const request = axios.create({
  timeout: 5000,
  baseURL: 'http://api.anlan.xyz/game',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
});

request.interceptors.response.use((res) => {
    if (res.status === 200) {
      return Promise.resolve(res);
    } else {
      Message({
        message: res.message,
        type: 'warning'
      })
      return Promise.reject(res);
    }
  }, (err) => {
    Message({
      message: err.message,
      type: 'error'
    })
    return Promise.reject(err)
  }
);


class Http {
  static get (url, params) {
    return request.get(url, { params })
  }

  static post (url, params, contentType = 'json') {
    if (contentType === 'urlencoded') {
      return request.post(url, qs.stringify(params))
    } else {
      return request.post(url, params, {
        headers: { 'Content-Type': 'application/json' }
      })
    }
  }
}

export default Http