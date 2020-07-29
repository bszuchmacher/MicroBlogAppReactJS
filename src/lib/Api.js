import axios from 'axios';

const baseURL = 'https://fullstack-web-course.ew.r.appspot.com/';

export function getTweets() {
    return axios.get(`${baseURL}/tweet`);
};

export function sendTweet(msg) {
    return axios.post(`${baseURL}/tweet`, msg);
};