import axios from 'axios'
const APIkey = process.env.REACT_APP_API_KEY
const url = 'http://api.openweathermap.org/data/2.5'
const getCity = (city) => {
    if (city === ' '){
        return
    }
    console.log('city',city)
    const request = axios.get(url+'/find?q='+city+'&appid='+APIkey+'&units=metric')
    return request.then(response => response.data)
}

const getAll = () => {
    const request = axios.get(url+'/forecast?id=524901&appid='+APIkey)
    return request.then(response => response.data)
}
export default{
    getCity,
    getAll
}