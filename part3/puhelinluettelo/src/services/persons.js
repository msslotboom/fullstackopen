import axios from 'axios'
const baseUrl = 'https://serene-depths-80959.herokuapp.com/api/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = (newObject) => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}


const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}

const remove = (id) => {
    //console.log(id)
    axios.delete(`${baseUrl}/${id}`)
    //console.log(request.then(response => response.data))
}

export default { 
    getAll, 
    create, 
    update,
    remove
  }