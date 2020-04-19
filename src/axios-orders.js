import axios from 'axios';
const instance = axios.create({
        baseURL: 'https://osng-http.firebaseio.com/'
    }
);
export default instance;