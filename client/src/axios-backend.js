import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://chat-front-41012.firebaseio.com/'
});

export default instance;