import axios from 'axios';

const client = axios.create({ baseURL: 'http://localhost:8088'})

const request = ({...options }) => {
    client.defaults.headers.common.Authorization = `Bearer `+ localStorage.getItem('token')
    const onSuccess = (response) => response
    const onError = (error) => error

    return client(options).then(onSuccess).catch(onError)
}

export default request;
