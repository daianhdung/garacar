import Cookies from 'js-cookie';


export const saveCookie = function saveCookie(name, value, time) {
    return Cookies.set(name, value, { expires: time / 60 / 60 / 24});
}

export const getCookie = function getCookie(name) {
    return Cookies.get(name);
}


export const removeCookie = (name) => {
    Cookies.remove(name);
}

