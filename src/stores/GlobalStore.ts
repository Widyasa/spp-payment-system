import {defineStore} from "pinia";
import axios from "axios";
import {apiUrl} from "@/helpers/global";

export const allApiStore = defineStore('allApiStore', () => {
    async function postCreate(request:object, pathUrl:string){
        return await axios.post(apiUrl + pathUrl, request)
    }
    async function postUpdate(request:object, id:string, pathUrl:string) {
        return await axios.post(apiUrl + pathUrl + `/${id}`, request)
    }
    async function postDelete(id:any, pathUrl:string) {
        return await axios.post(apiUrl + pathUrl + `/${id}`)
    }
    async function getById(id:any, pathUrl:string) {
        return await axios.get(apiUrl + pathUrl + `/${id}`)
    }
    async function getAll(pathUrl:string) {
        return await axios.get(apiUrl + pathUrl)
    }
    return{
        postCreate,
        postUpdate,
        postDelete,
        getById,
        getAll
    }
})