import axios from 'axios';
const method = { GET: 'get', POST: 'post', PUT: 'put', DELETE: 'delete' };

export default function ({ type, url, params }) {
    return new Promise((reslove, reject) => {
        if (['GET', 'DELETE'].includes(type)) {
            axios[method[type]](url, { params })
                .then(res => reslove(res.data)).catch(err => reject(err));
        } else {
            axios[method[type]](url, params)
                .then(res => reslove(res.data)).catch(err => reject(err));
        }
    });
}