import axios, {AxiosRequestConfig} from 'axios';

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.baseURL = process.env.VUE_APP_BASE_URL;
axios.defaults.withCredentials = true;
export default function request<T>(url: string, type = 'GET', data = {}): Promise<T>{
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
    axios(config).then(data => {
      if (data.status === 200) {
        resolve(data.data);
      } else {
        reject(data.data);
      }
    }).catch(() => {
      reject({msg: '网络异常'});
    });
  });
}