import AxiosREST from 'axios';

export  default class ConfigAxios {
    constructor() {
        this.Axios = AxiosREST.create({
            baseURL: process.env.VUE_APP_ROOT_API
        })
    }
}
