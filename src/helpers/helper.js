import moment from 'moment';

import {
    SEGMENT_CREATION,
    SCHEDULE_CREATION,
} from '../constants/constants.js';


export function isLoggedIn(){
    const username = localStorage.getItem("username");
    const token = localStorage.getItem("token")
    return ((username && token) ? true : false);
}

export function getUserName() {
    return localStorage.getItem("username");
}


export function cacheData(storageName, data) {
    if (!storageName || !data) return;
    sessionStorage.setItem(storageName, JSON.stringify(data));
}

export function getCacheData(storageName) {
    console.log(sessionStorage)
    if (!storageName) return {};
    return JSON.parse(sessionStorage.getItem(storageName));
}

export function clearCacheData(storageName) {
    if (!storageName) return;
    sessionStorage.removeItem(storageName);
}

export function clearAllCacheData(){
    clearCacheData(SEGMENT_CREATION);
    clearCacheData(SCHEDULE_CREATION);
}



export function isOverflown(element) {
    return (
        element.scrollHeight > element.clientHeight ||
        element.scrollWidth > element.clientWidth
    );
}

export function generateUniqueId(){
    return Math.random().toString(36).substring(2) + moment().format('x').toString(36);
}
