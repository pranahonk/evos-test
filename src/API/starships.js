import Axios from '@/API/configAxios';

export default class Starships extends Axios {

    getStarships(page){
        return this.Axios.get( `/starships/?page=${page}`)
    }

    getStarshipsDetail(id){
        return this.Axios.get( `/starships/${id}`)
    }

    searchStarships(q){
        return this.Axios.get(`/starships/?search=${q}`)
    }
}
