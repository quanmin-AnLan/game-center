import axios from 'axios';
import qs from 'qs';
import {
  Message
} from 'element-ui';

const request = axios.create({
  timeout: 5000,
  baseURL: 'http://api.anlan.xyz/game',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
});

request.interceptors.response.use(
  (res) => {
    // 正确请求则返回，异常状态码抛出异常
    if (res.status === 200) {
      const { data } = res
      if (data) {
        return Promise.resolve(data);
      } else {
        return Promise.resolve(res);
      }
    } else {
      Message({
        message: res.message,
        type: 'warning'
      })
      return Promise.reject(res);
    }
  }, (err) => {
    // 若请求失败则抛出异常
    Message({
      message: err.message,
      type: 'error'
    })
    return Promise.reject(err)
  }
);


class Http {
  static get(url, params) {
    return request.get(url, {
      params
    })
  }

  static post(url, params, contentType = 'json') {
    if (contentType === 'urlencoded') {
      return request.post(url, qs.stringify(params))
    } else {
      return request.post(url, params, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
    }
  }
}

export default Http