export const debounce = (cb, delay = 300) => {
    let time;
    return (...rest) => {
        time && clearTimeout(time);
        time = setTimeout(() => {
            typeof cb === 'function' && cb(...rest);
            time = undefined;
        }, delay);
    }
}

export const getUserInfo = () => {
    return JSON.parse(localStorage.getItem('userInfo') || '{}')
}

export const setUserInfo = (data, combin = true) => {
    const userInfo = getUserInfo();
    if (combin) localStorage.setItem('userInfo', JSON.stringify({ ...userInfo, ...data }))
    else localStorage.setItem('userInfo', JSON.stringify(data))
}

export const formatDate = (dateString, formatValue = '-,:', detail = true) => {
    const formatNum = (num) => num > 10 ? num : '0' + num;

    const joinValue = formatValue.split(',');

    const date = new Date(dateString);

    const year = date.getFullYear();
    const month = formatNum(date.getMonth() + 1);
    const day = formatNum(date.getDate());

    const hour = formatNum(date.getHours());
    const minute = formatNum(date.getMinutes());
    const second = formatNum(date.getSeconds());

    return `${year + joinValue[0] + month + joinValue[0] + day} ${hour + joinValue[1] + minute + joinValue[1] + second}`;
}