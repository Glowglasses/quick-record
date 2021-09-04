import axios, {AxiosRequestConfig} from 'axios';
import {Message} from 'element-ui';

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
axios.defaults.baseURL = process.env.VUE_APP_BASE_URL;
axios.defaults.withCredentials = true;
export default function request<T>(url: string, type:"GET"|"POST"|"PATCH"|"DELETE" = 'GET', data = {}): Promise<T>{
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
      config.method = type;
    }
    axios(config).then(response => {
      if (response.status === 200) {
        resolve(response.data);
      } else {
        Message.error(response.data.msg)
        reject(response.data);
      }
    }).catch(error => {
      Message.error(error)
      reject({msg: '网络异常'});
    });
  });
}