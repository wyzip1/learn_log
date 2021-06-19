import axios from 'axios'

axios.defaults.baseURL = '/api';

axios.interceptors.request.use(config => {
    config.headers.authorization = localStorage.getItem('token');
    return config
})

// axios.post('/login', { username: '2362086452', password: 'ylhm4523' }).then(res => {
//     localStorage.setItem('token', res.data.meta.data.token);
// });