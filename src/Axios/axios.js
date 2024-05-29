import axios from 'axios';

export const axiosInstance = () => {
    const token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYTBkMDgzMTcxMTQzYjU1YzhhZGY0M2Y5M2E5ZDVjOSIsInN1YiI6IjY2NTQzYWFiYWUzNzQ4ZWQzYzAzZjgzMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2G5mq2Rc0a5IWK4BAHuhDgWHJlyMZRgoVJ-uC6xAv9s'
    axios.defaults.baseURL = 'https://api.themoviedb.org/3'
    if (token) {
        axios.defaults.headers.common = { 'Authorization': `Bearer ${token}` }
    }
    return axios;
}
