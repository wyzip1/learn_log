import axios from 'axios'
import { message } from 'ant-design-vue'
import router from '../router'
import { setUserInfo } from '../util'


// axios.defaults.baseURL = '/api';

const service = axios.create();

service.interceptors.request.use(config => {
    config.headers.authorization = localStorage.getItem('token');
    return config
})

service.interceptors.response.use(config => {
    const data = config.data;
    console.log('response', data);
    if ([333, 1].includes(data.status)) {
        message.error(data.meta.msg);
        if (data.status === 333) {
            localStorage.removeItem('token');
            setUserInfo({ login: false });
            setTimeout(() => {
                router.push('/login');
            }, 600);
        }
        return Promise.reject(data)
    }

    return data.meta;
});

export default service

export function auth() {
    return service({
        url: '/auth',
        method: 'POST'
    })
}