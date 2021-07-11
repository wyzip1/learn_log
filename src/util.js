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