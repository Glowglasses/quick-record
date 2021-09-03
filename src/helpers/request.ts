import axios, {AxiosRequestConfig} from 'axios';

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.baseURL = process.env.VUE_APP_BASE_URL;
axios.defaults.withCredentials = true;
export default function request(url: string, type = 'GET', data = {}) {
  return new Promise((resolve, reject) => {
    const config: AxiosRequestConfig = {
      url,
      validateStatus(status) {
        return (status >= 200 && status < 300) || status === 400;
      }
    };
    if (type.toLocaleLowerCase() === 'get') {
      config.params = data;
      config.method = 'GET';
    } else {
      config.data = data;
      config.method = 'POST';
    }
    axios(config).then(request => {
      if (request.status === 200) {
        resolve(request.data);
      } else {
        reject(request.data);
      }
    }).catch(() => {
      reject({msg: '网络异常'});
    });
  });
}