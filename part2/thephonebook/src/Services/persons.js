import axios from "axios";


const baseUrl = 'http://localhost:3001/persons'

//Gets all persons
const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = (newObject) => {
    const request = axios.post(baseUrl,newObject)
    return request.then(response => response.data)   
}

const destroy = ( objectID ) => {
    const request = axios.delete(`${baseUrl}/${objectID}`)
    return request
}

const update = ( objectID, newObject ) => {
    const updateURL = `${baseUrl}/${objectID}`
    const request = axios.put(updateURL, newObject)
    return request.then(response => response.data)
}

const personsService = {
    getAll,
    create,
    destroy,
    update
}

export default personsService


