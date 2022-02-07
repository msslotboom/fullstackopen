import axios from 'axios'
const url = 'https://restcountries.com/v3.1/all'

const getAll = () => {
    const request = axios.get(url)
    return request.then(response => response.data)
}
export default{
    getAll
}