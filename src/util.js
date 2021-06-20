export const debounce = (cb, delay = 300) => {
    let time;
    return () => {
        time && clearTimeout(time);
        time = setTimeout(() => {
            typeof cb === 'function' && cb();
            time = undefined;
        }, delay);
    }
}