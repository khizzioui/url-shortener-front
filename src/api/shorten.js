import axios from "axios"
import {API_URL} from '../env'

export default async function  getShortened(url) {
    //console.log(url)
   let response  = await axios.post(API_URL+'/shorten', { url });
   return response.data
}