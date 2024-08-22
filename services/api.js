
import axios from 'axios'

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    params: {
        api_key: 'a231cd42ae4eae6200da919c311c4c78',
        language: 'pt-BR',
        page: 1
    }
})

export default api 
